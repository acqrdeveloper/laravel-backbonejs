/**
 * Created by QuispeRoque on 27/12/16.
 */
require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        '_': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
    },
    shim: {
        backbone: {
            deps: ["jquery", "_"],
            exports: 'Backbone'
        }
    }
});

var items = [
    {title: "Macbook Air", price: 799},
    {title: "Macbook Pro", price: 999},
    {title: "The new iPad", price: 399},
    {title: "Magic Mouse", price: 50},
    {title: "Cinema Display", price: 799},
];

require([
        "jquery",
        "_",
        "backbone",
        "../js/routers/router",
    ], function ($, _, Backbone, Router) {
        Backbone.history.start();
        return Router;
    }
);

