import Backbone from "backbone";
import template from "../templates/dialog.hbs";
import {MDCDialog} from '@material/dialog';

export default class Dialog extends Backbone.View {
    constructor(options) {
        super();
        this.options = options;
    }

    render() {
        this.$el.html(template({
            title: this.options.title
        }));
        this.$el.find("#dialog-content").html(this.options.detailsTemplate({
            data: this.options.data
        }));
        const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
        dialog.open();
    }
}