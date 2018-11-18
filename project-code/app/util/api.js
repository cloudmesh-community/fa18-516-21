import $ from 'jQuery';

export default class Api {
    static baseUrl() {
        return "http://localhost:5000/graphql";
    }

    static get(params) {
        return $.getJSON(Api.baseUrl(), params);
    }

    static post(data, variables) {
        return $.ajax({
            url: Api.baseUrl(),
            type: 'POST',
            data: JSON.stringify({query: data, variables: variables}),
            contentType: "application/json; charset=utf-8",
	        dataType: "json"
        });
    }
}