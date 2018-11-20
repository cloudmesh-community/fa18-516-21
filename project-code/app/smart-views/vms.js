import Backbone from "backbone";
import Tabs from "../dumb-views/tabs";
import Button from "../dumb-views/button";
import template from "../templates/vms.hbs";
import Api from "../util/api";
import $ from "jquery";
import dispatcher from "../util/dispatcher";
import Dialog from "../dumb-views/dialog";
import Notification from "../dumb-views/notification";
import detailsTemplate from "../templates/vmdetails.hbs";

export default class VMs extends Backbone.View {
    constructor() {
        super();
        this.tabsView = new Tabs({
            triggerName: "vmTabSelected",
            tabs: ["AWS", "Azure"]
        });
        dispatcher.on("vmTabSelected", this.tabSelected, this);
        dispatcher.on("cardAction", this.updateCard, this);
        dispatcher.on("showDetails", this.showDetails, this);
        dispatcher.on("updateVMDataClick", this.updateMongoDB, this);
        this.pageInfo = {};
        this.selectedTab = "aws";
        this.isLoading = false;
        this.edges = {aws:[],azure:[]};
        this.updateVMButton = new Button({
            id: "updateVMData",
            label: "Update VM Data",
            optionalClass: "raised",
            style: "float:right"
        });
    }

    static vmClause(vmkind) {
        switch (vmkind) {
            case "aws":
                return {
                    clause: "allAwss",
                    title: "AWS"
                };
            case "azure":
                return {
                    clause: "allAzures",
                    title: "Azure"
                };
            default:
            return {
                clause: "allAwss",
                title: "AWS"
            };
        }
    }

    render() {
        this.$el.html(template());
        this.tabsView.setElement("#vmTabs").render();
        this.tabSelected("aws");
        this.updateVMButton.setElement("#actionButtons").render();
    }

    tabSelected(name) {
        if (this.edges[name] && this.edges[name].length > 0) {
            dispatcher.trigger("showCards", this.edges[name]);
            return;
        }
        this.selectedTab = name;

        let that = this;
        let vm = VMs.vmClause(name);
        this.loadFirstPageData(vm);

        $(".drawer-main-content").off('scroll').on('scroll', function(e) {
            let numerator = $(".drawer-main-content").scrollTop();
            let denominator = $(".drawer-main-content-body").height() + 80 - $(".drawer-main-content").height();
            if(!that.isLoading && ((numerator / denominator) >= 1)) {
                that.loadVMs(name, true);
            }
        });
    }

    loadFirstPageData(vm) {
        let vmQuery = "{ " + vm.clause + " (first:40) { edges { node { host, name, region, image, state, isFavorite} }, pageInfo { endCursor, hasNextPage } } }";
        Api.post(vmQuery).then((res) => {
            this.pageInfo[this.selectedTab] = res.data[vm.clause].pageInfo;
            this.edges[this.selectedTab].push(...res.data[vm.clause].edges);
            dispatcher.trigger("showCards", this.edges[this.selectedTab]);
        });
    }

    updateCard(card, node) {
        let value = card.value ? card.value : "false";
        let updateClause = card.type === "aws" ? "updateAws" : "updateAzure";
        let action = ["start","stop","shutdown"].includes(card.action) ? "state" : card.action;
        let vmMutation = "mutation($cardAction:String!,$value:String!,$host:String!,$action:String!) { " + updateClause + 
            "(host:$host, action:$action, actionDetail: $cardAction, value: $value) { " + card.type + " { " + action + " } } }";
        var variables = {};
        variables.cardAction = card.action;
        variables.action = action;
        variables.host = node.host;
        variables.value = value;

        Api.post(vmMutation, variables).then((res) => {
            dispatcher.trigger("reRenderCard" + node.host, Object.assign(node, res.data[card.type === "aws" ? "updateAws" : "updateAzure"][card.type]));
        });
    }

    loadVMs(name, nextPage=false) {
        let vm = VMs.vmClause(name);
        if (nextPage && !this.pageInfo[name].hasNextPage) return;
        
        this.isLoading = true;
        let afterClause = nextPage && this.pageInfo[name] && this.pageInfo[name].hasNextPage ?
            "after: \"" + this.pageInfo[name].endCursor + "\"":
            "";
        let vmQuery = "{ " + vm.clause + " (first: 40 " + afterClause + ")" +
            " { edges { cursor, node { host, name, region, publicIps, privateIps, image, state, isFavorite} }, " +
            " pageInfo { endCursor, hasNextPage } } }";

        Api.post(vmQuery).then((res) => {
            this.pageInfo[name] = res.data[vm.clause].pageInfo;
            this.edges[name].push(...res.data[vm.clause].edges);
            dispatcher.trigger("showCards", this.edges[name]);
            this.isLoading = false;
        });
    }

    showDetails(card, node) {
        let vm = VMs.vmClause(card.type);
        let getDetails = "query($host:String!) {" + vm.clause + "(host:$host) { edges { node { host, name, region, publicIps, privateIps, image, state, isFavorite, extra } } } }";
        var variables = {};
        variables.host = node.host;

        Api.post(getDetails, variables).then((res) => {
            new Dialog({title: "VM Details", data: res.data[vm.clause].edges[0].node, detailsTemplate: detailsTemplate}).setElement("#showDialog").render();
        });
    }

    updateMongoDB() {
        let fetchClause = this.selectedTab === "aws" ? "fetchAWSData" : "fetchAzureData";
        let query = "{ "+ fetchClause +" }";
        
        Api.post(query, {}).then((res) => {
            new Notification({text: "Data successfully loaded from cloud to database."}).render();
            this.loadFirstPageData(VMs.vmClause(this.selectedTab));
        });
    }
}