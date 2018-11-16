import Backbone from "backbone";
import dispatcher from "../util/dispatcher";
import template from "../templates/button.hbs";

export default class Button extends Backbone.View {
    constructor(options) {
        super();
        this.options = options;
        this.events = {
            "click button": "buttonClicked"
        }
    }

    render() {
        this.$el.html(template({
            id: this.options.id,
            label: this.options.label,
            optionalClass: this.options.optionalClass
        }));
    }

    buttonClicked(e) {
        dispatcher.trigger(e.currentTarget.id + "Click");
    }
}