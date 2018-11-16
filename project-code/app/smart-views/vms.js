import Backbone from "backbone";
import template from "../templates/vms.hbs";
import Api from "../util/api";

export default class VMs extends Backbone.View {
    constructor() {
        super();
    }

    render() {
        let vmQuery = { "query" :"{ allAwss { edges { node { host, name, region, publicIps, privateIps, image, state} } } }"};
        Api.post(vmQuery).then((res) => {
            this.$el.html(template({edges: res.data.allAwss.edges}));
        });
    }
}