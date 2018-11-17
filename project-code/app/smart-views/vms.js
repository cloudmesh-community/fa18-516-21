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
            triggerName: 'vmTabSelected',
            tabs: ['AWS', 'Azure']
        });
        dispatcher.on('vmTabSelected', this.tabSelected, this);
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

    reload(frame, card, e) {
        let vmkind = $(card).data('vmkind');
        let vm = VMs.vmClause(vmkind);
        let vmQuery = { "query" :"{ " + vm.clause + 
                " { edges { node { host, name, region, publicIps, privateIps, image, state} } } }"};
        
        Api.post(vmQuery).then((res) => {
            res.data[vm.clause].edges.forEach(e => {
                e.node.isRunning = e.node.state.toLowerCase() === "running";
                e.node.isStopped = e.node.state.toLowerCase() === "stopped";
                e.node.isSuspended = e.node.state.toLowerCase() !== "running" && e.node.state.toLowerCase() !== "stopped";
            });
            frame.$el.html(vmTemplate({title: vm.title, edges: res.data[vm.clause].edges}));

            $('.icon-button').unbind('click').on('click', function(eb) {
                let action = $(this).data('action');
                let newState, vmMutation;
                /* TODO: this is business logic, UI can't decide new state. It must be server. UI can just send action */
                if (vmkind === "aws") {
                    if (action === "stop") {
                        newState = "stopped";
                    } else if (action === "shutdown") {
                        newState = "terminated";
                    } else {
                        newState = "running";
                    }
                    vmMutation = { "query": "mutation { updateAws(host:\"" + $(this).data('host') + "\", state:\"" + newState + "\") { aws { state } } }" };
                } else if (vmkind === "azure") {
                    if (action === "stop") {
                        newState = "Stopped";
                    } else if (action === "shutdown") {
                        newState = "Deallocated";
                    } else {
                        newState = "Running";
                    }
                    vmMutation = { "query": "mutation { updateAzure(host:\"" + $(this).data('host') + "\", state:\"" + newState + "\") { azure { state } } }" };
                }

                Api.post(vmMutation).then((res) => {
                    if (res && res.data) frame.reload(frame, card, e);
                });
            });
        });
    }

    render() {
        /*let parent = this;
        parent.$el.html(selectTemplate());

        $('.mdc-card').on("click", function(e) {
            e.preventDefault();
            
            parent.reload(parent, this, e);
        });*/
        this.$el.html(template());
        this.tabsView.setElement("#vmTabs").render();
        this.tabSelected(null, 'AWS');
    }

    tabSelected(e, name) {
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
}