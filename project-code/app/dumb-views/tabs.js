import Backbone from "backbone";
import $ from "jquery";
import _ from "underscore";
import {MDCTabBar} from "@material/tab-bar";
import dispatcher from "../util/dispatcher";
import Card from "./card";
import template from "../templates/tabs.hbs";
import gridLayout from "../templates/gridLayout.hbs";

export default class Tabs extends Backbone.View {
    constructor(options) {
        super();
        this.options = options;
        this.events = {
            'click button.mdc-tab': 'tabSelected'
        }
        dispatcher.on('showCards', this.showCards, this);
    }

    render() {
        this.$el.html(template({
            tabs: this.options.tabs
        }));
        var tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
        var contentEls = document.querySelectorAll('.content');
        tabBar.listen('MDCTabBar:activated', function(event) {
            document.querySelector('.content--active').classList.remove('content--active');
            contentEls[event.detail.index].classList.add('content--active');
        });
        this.selectedTab = "aws";
    }

    tabSelected(e) {
        this.selectedTab = $(e.currentTarget).data('name');
        dispatcher.trigger(this.options.triggerName, this.selectedTab);
    }

    showCards(edges) {
        this.$el.find('.content--active').html(gridLayout({
            edges: edges
        }));
        _.each(edges, (edge) => {
            new Card({edge: edge, type: this.selectedTab}).setElement("[id='"+ edge.node.host +"']").render();
        });
    }
}