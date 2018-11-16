import $ from 'jQuery';

class Api {
    constructor() {
        this.baseUrl = "http://localhost:5000/graphql";
    }

    Get(params) {
        return $.getJSON(this.baseUrl, params);
    }

    Post(data) {
        return $.ajax({
            url: this.baseUrl,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
	        dataType: "json"
        });
    }
}

export default Api;