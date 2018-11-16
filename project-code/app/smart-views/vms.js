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
                return "allAwss";
            case "azure":
                return "allAzures";
            default:
            return "allAwss";
        }
    }

    render() {
        let parent = this.$el;
        parent.html(selectTemplate());

        $('.mdc-card').on("click", function(e) {
            e.preventDefault();

            let vm = VMs.vmClause($(this).data('vmkind'));
            let vmQuery = { "query" :"{ " + vm + 
                    " { edges { node { host, name, region, publicIps, privateIps, image, state} } } }"};
            
            Api.post(vmQuery).then((res) => {
                parent.html(vmTemplate({edges: res.data[vm].edges}));
            });
        });
    }
}