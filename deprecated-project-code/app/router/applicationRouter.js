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
    }

    navigate(route) {
        this.routes[route]();
    }

    login() {
        if(!this.loginView){
            this.loginView = new Login();
        }
        this.loginView.setElement("#cloudmesh-app").render();
    }

    app() {
        if(!this.appView){
            this.appView = new App();
        }
        this.appView.setElement("#cloudmesh-app").render();
        document.getElementById("title").innerHTML = "Dashboard";
    }

    vms() {
        if(!this.vmView){
            this.vmView = new VMs();
        }
        this.vmView.setElement(".drawer-main-content-body").render();
        document.getElementById("title").innerHTML = "VM List";
    }
}
