import Login from "../smart-views/login";
import App from "../smart-views/app";
import VMs from "../smart-views/vms";

export default class ApplicationRouter {
    constructor () {
        this.routes = {
            "login": this.login,
            "app": this.app,
            "selectvm": this.vms,
        };
        this.contentEl = ".drawer-main-content";
    }

    navigate(route) {
        this.routes[route]();
    }

    login() {
        new Login().setElement("#cloudmesh-app").render();
    }

    app() {
        new App().setElement("#cloudmesh-app").render();
    }

    vms() {
        new VMs().setElement("#drawer-main-content-body").render();
    }
}
