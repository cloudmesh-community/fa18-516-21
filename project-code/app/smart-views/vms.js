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
         /* TODO: this is business logic, UI can't decide new state. It must be server. UI can just send action */
         /* For each query need to pass variable instead of creating string like below */
        let newState, vmMutation;
        if (card.type === "aws") {
            if (card.action === "stop") {
                newState = "stopped";
            } else if (card.action === "shutdown") {
                newState = "terminated";
            } else {
                newState = "running";
            }
            vmMutation = { "query": "mutation { updateAws(host:\"" + node.host + "\", state:\"" + newState + "\") { aws { state } } }" };
        } else if (card.type === "azure") {
            if (card.action === "stop") {
                newState = "Stopped";
            } else if (card.action === "shutdown") {
                newState = "Deallocated";
            } else {
                newState = "Running";
            }
            vmMutation = { "query": "mutation { updateAzure(host:\"" + node.host + "\", state:\"" + newState + "\") { azure { state } } }" };
        }
        Api.post(vmMutation).then((res) => {
            node.state = res.data[card.type === "aws" ? "updateAws" : "updateAzure"][card.type].state;
            node.isRunning = node.state.toLowerCase() === "running";
            node.isStopped = node.state.toLowerCase() === "stopped";
            node.isSuspended = node.state.toLowerCase() !== "running" && node.state.toLowerCase() !== "stopped";
            
            dispatcher.trigger("reRenderCard" + node.host, Object.assign({}, node));
        });
    }
}