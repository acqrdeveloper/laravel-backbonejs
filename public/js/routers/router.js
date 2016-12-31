/**
 * Created by QuispeRoque on 27/12/16.
 */
/*global define*/
define([
    "backbone",
    "../views/cartcollectionview",
    "../class/user_class",
], function (Backbone, CartCollectionView, UserClass) {

    var Router = Backbone.Router.extend({
        routes: {
            'Cart': 'loadCarts',
            'UserClass': 'loadUserClass',
        },
        initialize: function () {
            this.loadCarts();
            this.loadUserClass();
        },
        loadCarts: function () {
            return new CartCollectionView(items);
        },
        loadUserClass: function () {
            return UserClass.run();
        }
    });

    return new Router;

});