import Backbone from "backbone";
import template from "../templates/textbox.hbs";
import {MDCTextField} from '@material/textfield';
import { throws } from "assert";

class TextBox extends Backbone.View {
    constructor(options) {
        super();
        this.options = options;
    }

    render() {
        this.$el.html(template({
            id: this.options.id,
            label: this.options.label,
            value: this.options.value,
            outlined: this.options.outlined,
            width: this.options.width,
            type: this.options.type
        }));
        const textField = new MDCTextField(this.$el.find('.mdc-text-field')[0]);
    }
}

export default TextBox;