import Backbone from "backbone";
import $ from "jquery";
import dispatcher from "../util/dispatcher";
import template from "../templates/card.hbs";

export default class Card extends Backbone.View {
    constructor(options) {
        super();
        this.options = options;
        this.events = {
            'click .icon-button' : 'buttonClicked'
        };
        dispatcher.on("reRenderCard"+options.edge.node.host, this.reRenderCard, this);
    }

    render() {
        this.$el.html(template({
            node: this.options.edge.node,
            type: this.options.type
        }));
    }

    buttonClicked(e) {
        var cardObj = {};
        cardObj.type = $(e.currentTarget).data('type');
        cardObj.action = $(e.currentTarget).data('action');
        dispatcher.trigger("cardAction", cardObj, this.options.edge.node);
    }

    reRenderCard(data) {
        this.options.edge.node = Object.assign({}, data);
        this.render();
    }
}