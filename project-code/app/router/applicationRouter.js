import Login from "../smart-views/login";
import App from "../smart-views/app";

class ApplicationRouter {
    constructor () {
        this.routes = {
            "login": this.login,
            "app": this.app
        }
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
}

export default ApplicationRouter;