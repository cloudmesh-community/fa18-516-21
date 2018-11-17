import Backbone from "backbone";
import vmTemplate from "../templates/vms.hbs";
import selectTemplate from "../templates/selectvm.hbs";
import Api from "../util/api";
import $ from "jquery";

export default class VMs extends Backbone.View {
    constructor() {
        super();
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

            $('.mdc-button').on('click', function(eb) {
                let action = $(this).data('action');
                let newState, vmMutation;
                
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
        let parent = this;
        parent.$el.html(selectTemplate());

        $('.mdc-card').on("click", function(e) {
            e.preventDefault();
            
            parent.reload(parent, this, e);
        });
    }
}