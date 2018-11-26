import Backbone from "backbone";
import $ from "jquery";
import _ from "underscore";
import {MDCTabBar} from "@material/tab-bar";
import {MDCMenu} from '@material/menu';
import dispatcher from "../util/dispatcher";
import Card from "./card";
import template from "../templates/tabs.hbs";
import gridLayout from "../templates/gridLayout.hbs";

export default class Tabs extends Backbone.View {
    constructor(options) {
        super();
        this.options = options;
        this.events = {
            'click button.mdc-tab': 'tabSelected',
            'click button.icon-button': 'changeView',
            'click button#menu-button': 'openMenu',
            'click .mdc-list-item': 'menuItemClick'
        };
        dispatcher.on('showCards', this.showCards, this);
        this.currentView = null;
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
        this.menu = new MDCMenu(document.querySelector('.mdc-menu'));
        this.selectedTab = "aws";
    }

    openMenu() {
        this.menu.open = true;
    }

    menuItemClick(e) {
        dispatcher.trigger("sortCards", $(e.currentTarget).data('name'), this.selectedTab);
    }

    tabSelected(e) {
        this.selectedTab = $(e.currentTarget).data('name');
        dispatcher.trigger(this.options.triggerName, this.selectedTab);
    }

    changeView(e) {
        this.currentView = $(e.currentTarget).data('view');
        dispatcher.trigger(this.options.triggerName, this.selectedTab);
    }

    showCards(edges) {
        this.$el.find('.content--active').html(gridLayout({
            edges: edges,
            view: this.currentView || 'card'
        }));
        _.each(edges, (edge) => {
            new Card({edge: edge, type: this.selectedTab, view: this.currentView || 'card'}).setElement("[id='"+ edge.node.host +"']").render();
        });
    }
}