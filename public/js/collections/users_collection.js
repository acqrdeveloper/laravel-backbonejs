/**
 * Created by QuispeRoque on 18/12/16.
 */

var Users = Backbone.Collection.extend({
    url: "http://dev.api.com:8092/jsonIndex",
    model: User,
});