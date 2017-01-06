define([
    'jquery',
    'backbone',
    '../class/user_class',
], function ($, Backbone, UserClass) {

    var Router = Backbone.Router.extend({
        routes: {
            "create": "showContent",
            "index": "showContent",
            "show/:id": "showContent",
            "edit/:id": "showContent",
        },
        showContent: function () {
            this._loadAjaxContent(function () {
                $('#page-content .action-delete').submit(function () {
                    return confirm('está seguro de eliminar el registro?');
                });
                $('#page-content .action-edit').submit(function () {
                    return confirm('está seguro de actualizar el registro?');
                });
            });
        },
        _loadAjaxContent: function (callback) {
            $.ajax({
                method: "GET",
                url: Backbone.history.root + Backbone.history.fragment
            }).done(function (msg) {
                document.querySelector('#page-content').innerHTML = msg;
                if (typeof callback == 'function') {
                    callback();
                }
            }).fail(function () {

            }).always(function () {

            });
        }
    });

    return new Router;


});