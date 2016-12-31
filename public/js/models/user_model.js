/**
 * Created by QuispeRoque on 17/12/16.
 */

var User = Backbone.Model.extend({
    element_id: "1",
    defaults: {
        id: "",
        name: "",
        lastname: "",
        age: "",
        direction: "",
        email: "",
    },
    initialize: function () {

    },
    url: function (id) {
        return  "http://dev.api.com:8092/allId/"+ id;
    }
});