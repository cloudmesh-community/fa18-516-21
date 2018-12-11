import Backbone from "backbone";
import dispatcher from "../util/dispatcher";
import TextBox from "../dumb-views/textbox";
import Button from "../dumb-views/button";
import template from "../templates/login.hbs";

export default class Login extends Backbone.View {
    constructor() {
        super();
        this.userNameBox = new TextBox({
            id: "userName",
            label: "Enter Email",
            outlined: true,
            width: "300px",
            type: "email"
        });
        this.passWordBox = new TextBox({
            id: "passWord",
            label: "Enter Password",
            outlined: true,
            width: "300px",
            type: "password"
        });
        this.signInButton = new Button({
            id: "signIn",
            label: "Sign In",
            optionalClass: "raised"
        });
        dispatcher.on("signInClick", this.signIn, this);
    }

    render() {
        this.$el.html(template());
        this.userNameBox.setElement("#userNameTxt").render();
        this.passWordBox.setElement("#passWordTxt").render();
        this.signInButton.setElement(".login-footer").render();
    }

    signIn() {
        dispatcher.trigger("navigate", "app");
    }
}