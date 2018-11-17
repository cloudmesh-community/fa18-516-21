import Backbone from "backbone";
import Tabs from "../dumb-views/tabs";
import Card from "../dumb-views/card";
import template from "../templates/vms.hbs";
import Api from "../util/api";
import $ from "jquery";
import dispatcher from "../util/dispatcher";

export default class VMs extends Backbone.View {
    constructor() {
        super();
        this.tabsView = new Tabs({
            triggerName: "vmTabSelected",
            tabs: ["AWS", "Azure"]
        });
        dispatcher.on("vmTabSelected", this.tabSelected, this);
        dispatcher.on("cardAction", this.updateCard, this);
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
    }

    tabSelected(name) {
        let vm = VMs.vmClause(name);
        let vmQuery = { "query" :"{ " + vm.clause + " { edges { node { host, name, region, publicIps, privateIps, image, state} } } }"};
        Api.post(vmQuery).then((res) => {
            res.data[vm.clause].edges.forEach(e => {
                e.node.isRunning = e.node.state.toLowerCase() === "running";
                e.node.isStopped = e.node.state.toLowerCase() === "stopped";
                e.node.isSuspended = e.node.state.toLowerCase() !== "running" && e.node.state.toLowerCase() !== "stopped";
            });
            dispatcher.trigger("showCards", res.data[vm.clause].edges);
        });
    }

    updateCard(card, node) {
        let value = true;
        let updateClause = card.type === "aws" ? "updateAws" : "updateAzure";
        let vmMutation = { "query": "mutation { " + updateClause + 
            "(host:\"" + node.host + "\", action:\"" + card.action + 
            "\", value:\"" + value + "\") { " + card.type + " { " + (["start","stop","shutdown"].includes(card.action) ? "state" : card.action) + " } } }" };
        
        Api.post(vmMutation).then((res) => {
            node.state = res.data[updateClause][card.type].state;
            node.isRunning = node.state.toLowerCase() === "running";
            node.isStopped = node.state.toLowerCase() === "stopped";
            node.isSuspended = node.state.toLowerCase() !== "running" && node.state.toLowerCase() !== "stopped";
            
            dispatcher.trigger("reRenderCard" + node.host, Object.assign({}, node));
        });
    }
}