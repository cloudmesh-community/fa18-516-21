import Backbone from "backbone";
import template from "../templates/vms.hbs";
import Api from "../api";

class VMs extends Backbone.View {
    constructor() {
        super();
        this.api = new Api();
    }

    render() {
        let vmQuery = { "query" :"{ allAwss { edges { node { host, region, image } } } }"};
        this.api.Post(vmQuery).then((res) => {
            // res = {"data":{"allAwss":{"edges":[{"node":{"host":"aws1.amazon.com","region":"us-east-1","image":"ami-0bbe6b35405ecebdb"}},{"node":{"host":"aws1.amazon.com","region":"us-east-1","image":"ami-0bbe6b35405ecebdb"}},{"node":{"host":"aws1.amazon.com","region":"us-east-1","image":"ami-0bbe6b35405ecebdb"}},{"node":{"host":"aws1.amazon.com","region":"us-east-1","image":"ami-0bbe6b35405ecebdb"}},{"node":{"host":"aws1.amazon.com","region":"us-east-1","image":"ami-0bbe6b35405ecebdb"}}]}}};
            // let awss = new Awss();
            // if (res && res.data && res.data.allAwss && res.data.allAwss.edges) {
            //     res.data.allAwss.edges.forEach(e => {
            //         awss.add(new Aws(e.node.host, e.node.region, e.node.image));
            //     });
            // }
            // this.$el.html(template({"Awss": awss}));

            let awss = [];
            if (res && res.data && res.data.allAwss && res.data.allAwss.edges) {
                res.data.allAwss.edges.forEach(e => {
                    awss.push({ host: e.node.host, region: e.node.region, image: e.node.image});
                });
            }
            this.$el.html(template({"Awss": awss}));
        });
    }
}

export default VMs;