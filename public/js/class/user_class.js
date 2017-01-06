/**
 * Created by QuispeRoque on 27/12/16.
 */
define([
    "jquery",
    "underscore",
    "backbone",
    "../util",
], function ($, _, Backbone, Util) {

    var objusers = null;
    var objview = null;
    var objuser = null;

    var UserClass = {
        run: function () {
            //todo: delegacion de eventos a elementos javascript.
            $('form#frmCreate').on('submit', this.fnAddUser);

            this.init();
        },
        init: function () {
            //todo: inicializar las clases Backbone.js
            this.loadFramework();
        },
        loadFramework: function () {
            var User = Backbone.Model.extend({
                url: "",
                initialize: function () {
                }
            });
            var UserView = Backbone.View.extend({
                el: '.contentClass',
                events: {
                    'click #btnLoad': 'fnGetAll',
                    'click .btn-edit-click': 'fnEditJson',
                    'click .btn-delete-click': 'fnDeleteJson',
                },
                initialize: function () {
                    this.listenTo(objusers, 'update', this.render);
                    this.render();
                },
                render: function () {

                    this.fnGetAll();
                },
                fnGetAll: function () {
                    var template = _.template($('#tplGetAll').html()),
                        etiqueta = $('#tbodyGetAll'),
                        html = "";
                    $.getJSON(Util.urlRoot + "indexJson", {}, function (response) {
                        html = Util.fnDoCicloObjects(response.data, template);
                        etiqueta.html(html);
                    });
                },
                fnEditJson: function (e) {
                    e.preventDefault();
                    var $this = $(e.currentTarget),
                        dataid = $this.data('id'),
                        $row = $this.closest('var-row'),
                        template = _.template($('#tplEditJson').html()),
                        html = "";
                    $.ajax({
                        type: "GET",
                        url: Util.urlRoot + "editJson/" + dataid,
                        data: null,
                        dataType: "json",
                    }).done(function (response) {
                        console.log(response.data);
                        html = template(response.data);
                        $('#platformEdition').html(html);
                        console.log(html);
                    }).always(function () {

                    }).fail(function (response) {
                        console.log(response);
                    });
                },
                fnDeleteJson: function (e) {
                    e.preventDefault();
                    var rpta = confirm("¿esta seguro de eliminar el item?");
                    if (rpta) {
                        console.log("eliminado");
                    }
                }
            });
            var Users = Backbone.Collection.extend({
                model: User,
                initialize: function () {
                }
            });

            objview = new UserView();
            objusers = new Users();
            objuser = new User();
        },
        fnAddUser: function (e) {
            e.preventDefault();
            var $this = $(this),
                $form = $this.closest('form'),
                $inputs = $form.find(':input[name]'),
                $data = $form.serializeArray(),
                $dataObject = Util.fnGetObjectFields($data);
            objuser.save($dataObject, {
                url: Util.urlRoot + "storeJson",
                success: function (model, response) {
                    $inputs.prop('disabled', true);
                    $('#idAlertFlash').removeClass('hidden');
                    $('#idAlertFlash p').text("created successfully");
                    Util.fnGo("index");
                }
            }).fail(function (response) {
                    console.log(response);
                    console.log(response.responseText);
                $('#idAlertFlashApi').removeClass('hidden');
                $('#idAlertFlashApi p').html('');

                $.each(response.responseText.split(','), function (rpta) {

                    var arr = response.responseText.split(',');
                    var smsalerta = arr[rpta].replace('{', '').replace('}', '') + '<br>';

                    $('#idAlertFlashApi p').append(smsalerta);
                });
            }).always(function () {
                $inputs.prop('disabled', false);
                objview.fnGetAll();
            })
        },
        fnGetUserId: function (e) {
            e.preventDefault();
            var $this = this.$(this),
                dataid = $this.data('id'),
                $row = $this.closest('var-row'),
                template = _.template($('#tplEditJson').html()),
                html = "";
            console.log($this);
            $.ajax({
                type: "GET",
                url: Util.urlRoot + "editJson/" + dataid,
                data: null,
                dataType: "JSON",
            }).done(function (response) {
                console.log(response.data);
                html = template(response.data);
                $('#platformEdition').html(html);
            }).always(function () {

            }).fail(function () {

            });
        }
    };

    return UserClass;

});
