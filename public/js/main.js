/**
 * Created by QuispeRoque on 27/12/16.
 */

var rootPath = document.querySelector('body').dataset.rooturl.replace('://', '');
if (!rootPath.endsWith('/')) {
    rootPath += '/';
}
var index = rootPath.indexOf('/');
rootPath = (index !== -1 && index + 1 < rootPath.length) ? rootPath.substr(index) : rootPath = '/';

require.config({
    // Base path used to load scripts
    baseUrl: rootPath + 'js',
    deps: ['app'],
    // Prevent caching during dev
    urlArgs: "t=" + (new Date()).getTime(),

    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'autoc': '../bower_components/devbridge-autocomplete/dist/jquery.autocomplete.min',
        'lodash': 'lib/lodash/lodash.min',
        'toastr': 'lib/toastr/build/toastr.min'
    },
    shim: {
        '../bower_components/underscore/underscore': {
            exports: '_'
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: 'Backbone'
        }
    },
    map: {
        "*": {
            "underscore": "lodash"
        }
    }
});

// var items = [
//     {title: "Macbook Air", price: 799},
//     {title: "Macbook Pro", price: 999},
//     {title: "The new iPad", price: 399},
//     {title: "Magic Mouse", price: 50},
//     {title: "Cinema Display", price: 799},
// ];
//
// require([
//         "jquery",
//         "underscore",
//         "backbone",
//         // "../js/routers/user_router",
//     ], function ($, _, Backbone, Router) {
//     Backbone.history.start();
//         // return  Router;
//     }
// );

