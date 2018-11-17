import Backbone from "backbone";
import dispatcher from "../util/dispatcher";
import template from "../templates/card.hbs";

export default class Card extends Backbone.View {
    constructor(options) {
        super();
        this.options = options;
        this.events = {
            'click .icon-button' : 'buttonClicked'
        }
    }

    render() {
        this.$el.html(template({
            node: this.options.edge.node
        }));
    }

    buttonClicked(e) {
        console.log('clicked');
    }
}