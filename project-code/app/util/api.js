import $ from 'jQuery';

export default class Api {
    static baseUrl() {
        return "http://localhost:5000/graphql";
    }

    static get(params) {
        return $.getJSON(Api.baseUrl(), params);
    }

    static post(data) {
        return $.ajax({
            url: Api.baseUrl(),
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
	        dataType: "json"
        });
    }
}