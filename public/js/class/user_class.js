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
                nombre: "Alex Quispe",
                arrModel: [],
                defaults: {
                    price: 35,
                    photo: "http://www.placedog.com/100/100"
                },
                initialize: function () {
                    this.fnSaludar();
                },
                fnSaludar: function () {
                    // console.log("function 2");
                    // var miobj = {a: "a", b: "b"}
                    for (var i = 0; i < 10; i++) {
                        console.info("notice " + i);
                    }
                }
            });
            objUser = new User();

        }
    };

    return UserClass;

});
