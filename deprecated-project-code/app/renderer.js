// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import Router from "./router/applicationRouter";
import dispatcher from "./util/dispatcher";

// Instantiation
let router = new Router();

dispatcher.on("navigate", href => router.navigate(href));

router.navigate("login");

