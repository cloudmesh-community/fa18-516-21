import Backbone from 'backbone';
import $ from "jquery";
import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCList} from "@material/list";
import dispatcher from "../util/dispatcher";
import template from "../templates/app.hbs";

class App extends Backbone.View {
    constructor() {
        super();
    }

    render() {
        this.$el.html(template());
        const topAppBar = new MDCTopAppBar(this.$el.find('.mdc-top-app-bar')[0]);
        const list = MDCList.attachTo(this.$el.find('.mdc-list')[0]);
        list.wrapFocus = true;

        $('.mdc-list-item').on("click", e => {
            e.preventDefault();
            dispatcher.trigger("navigate", $(e.currentTarget).attr('href'));
        });
    }
}

export default App;