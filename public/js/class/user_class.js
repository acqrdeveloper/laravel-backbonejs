/**
 * Created by QuispeRoque on 27/12/16.
 */
define([
    "jquery",
    "underscore",
    "backbone",
], function ($, _, Backbone) {

    var objUser = null;
    var objusers = null;
    var objview = null;

    var UserClass = {
        nameModelo: "hola_amigos",
        run: function () {


            var User = Backbone.Model.extend({
                nombre: "alex Quispe",
                arrModel: ["arreglo"],
                defaults: {
                    price: 35,
                    photo: "http://www.placedog.com/100/100"
                }
            });

            /*
             var Users = Backbone.Collection.extend({
             model: User,
             url: "http://dev.api.com:8092/user/getall",
             });

             var UserView = Backbone.View.extend({
             template: _.template($('#tplTbody').html()),
             initialize: function () {
             this.render();
             },
             render: function () {
             this.template({name: "1", lastname: "nueva foto"});
             return $(this.el).html(this.template);
             }
             });

             objusers = new Users({price: "1", photo: "nueva foto"}, {price: "2", photo: "nueva foto"});
             // objUser = new User({price:"1",photo:"nueva foto"},{price:"2",photo:"nueva foto"});
             // console.log(objUser.get('price'));

             objview = new UserView({el: $('#idTbody')});

             objusers.fetch(
             {
             success: function (model, response, options) {
             console.log(response.data[0]);
             console.log(model);
             }
             });

             */
        }
    }

    return UserClass;

});
