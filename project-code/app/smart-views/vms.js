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

    render() {
        let parent = this.$el;
        parent.html(selectTemplate());

        $('.mdc-card').on("click", function(e) {
            e.preventDefault();

            let vm = VMs.vmClause($(this).data('vmkind'));
            let vmQuery = { "query" :"{ " + vm.clause + 
                    " { edges { node { host, name, region, publicIps, privateIps, image, state} } } }"};
            
            Api.post(vmQuery).then((res) => {
                parent.html(vmTemplate({title: vm.title, edges: res.data[vm.clause].edges}));
            });
        });
    }
}