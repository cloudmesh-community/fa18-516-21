// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import Router from "./router/applicationRouter";
import dispatcher from "./util/dispatcher";

// Instantiation
let router = new Router();

dispatcher.on("navigate", href => router.navigate(href));

router.navigate("login");
/*var http = new XMLHttpRequest();
var url = 'http://localhost:5000/graphql/';
var params = JSON.stringify({"query":"{ repos{ name, url }}"});
http.open('POST', url, true);

//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/json');

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        document.getElementById("test").innerHTML = http.responseText;
    }
}
http.send(params);*/

