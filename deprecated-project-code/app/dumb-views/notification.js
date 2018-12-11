import Backbone from "backbone";
import {MDCSnackbar} from '@material/snackbar';
import template from "../templates/notification.hbs";

export default class Notification extends Backbone.View {
    
    constructor(options) {
        super();
        this.options = options;
        this.setElement("#notificationDiv");
    }

    render() {
        this.$el.html(template({
            text: this.options.text
        }));
        const snackbar = new MDCSnackbar(this.$el.find('.mdc-snackbar')[0]);
        snackbar.show({
            message: this.options.text
        })
    }
}