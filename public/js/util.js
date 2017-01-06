define([
    'jquery',
    '../js/models/notification',
    'autoc'
], function ($, Notification, autocomplete) {

    var Util = {
        urlRoot: "http://dev.apilar.com:8092/",
        intervalID: 0,
        intervalTitle: 0,
        intervalModalError: 0,
        formatDate: 'YYYY-MM-DD',
        margen: 31, // Altura de la cabecera q está en fixed
        appendTo: 'body',
        usuario_id: parseInt($('html').data('xsid')),
        usuario_name: null,
        limit: 0,
        start: function () {
            var $body = $('body');
            $body.on('click', 'a.push-url', function (e) {
                e.preventDefault();
                var url = $(this).data('url');
                if (url === undefined) {
                    url = $(this).attr('href').split('/');
                    if (url[0] !== 'mensajes' && url[0] !== 'detalle-empresa') {
                        url = url.pop();
                    } else {
                        url = url.join('/');
                    }
                }
                Util.navigateTo(url);
                Util.fnCloseModal($(this).closest('.modal'));
            });
            $body.on('click', 'div.modal .btn-submit', function (e) {
                $(e.currentTarget).closest('.modal').find('form').submit();
            })
                .on('hidden.bs.modal', 'div.modal', function () {
                    $(this).find('form').trigger('reset');
                });

            // Instancia la clase Notifications, para la recepcion de notificaciones.
            Notification.fnLoadModelCollection();
            // Evento agregado para vizualizar las notificaciones
            $('#btnGetNotify').on('click', this.fnGetBarNotifications);
            $('#dropdown-notify')
                .on('show.bs.dropdown', function (e) {
                    $(e.relatedTarget).removeClass('hint--bottom-left');
                })
                .on('hidden.bs.dropdown', function (e) {
                    $(e.relatedTarget).addClass('hint--bottom-left');
                });
        },
        i18n_es: {
            previousMonth: 'Anterior Mes',
            nextMonth: 'Siguiente Mes',
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
        },
        fnAlert: function ($pageTag, message, alertType) {
            alertType = alertType || 'alert-success';
            $pageTag.find('div.content-message').html(_.template($('#message-alert').html(), {variable: 'message'})(message))
                .children().addClass(alertType);
        },
        customParse: function (resp) {
            return resp.data;
        },
        fnGetObjectFields: function (fields, other) {
            var data = {}, otherField = [];
            _.each(fields, function (val) {
                if (parseInt(val.value) && !isNaN(val.value) && val.name != 'fac_dni' && val.name != 'dni' && val.name != 'empresa_ruc') {
                    data[val.name] = parseFloat(val.value);
                } else if (val.name !== 'id') {
                    data[val.name] = val.value;
                }
                if (val.name === other) {
                    otherField.push(val.value);
                }
            });

            if (otherField.length) {
                data[other] = otherField;
            }
            return data;
        },
        fnCloseAndResetModal: function ($form) {
            $form.closest('.modal').modal('hide');
        },
        fnCloseModal: function ($modal) {
            $modal.modal('hide');
        },
        fnRemoveLoading: function () {
            return setInterval(this.fnRemoveLoadingNow, 11000);
        },
        fnDoCicloObjects: function (arrObjects, template) {
            var i = 0, html = "";
            for (i; i < arrObjects.length; i++) {
                html += template(arrObjects[i]);
            }
            return html;
        },
        fnClearInterval: function () {
            clearInterval(this.intervalID);
            this.intervalID = 0;
        },
        fnAlertBootstrap: function (txt, nivel) {
            var alert = $('#idAlertFlashApi');
            switch (nivel) {
                case "danger":
                    nivel = "danger"
                    break;
                case "info":
                    nivel = "info"
                    break;
                default:
                    nivel = "success";
            }
            alert.prop("hidden", false);
            alert.addClass("alert-" + nivel);
            alert.find('p').text(txt);
        },
        fnRemoveLoadingNow: function () {
            var $box = $('#bar-message');
            if (!$box.hasClass('hidden')) {
                $box.addClass("hidden");
            }
            Util.fnClearInterval();
        },
        fnBarLoading: function (txt, autoClose) {
            autoClose = autoClose || false;
            $('#bar-message').removeClass('hidden').html(txt);
            if (this.intervalID > 0) {
                this.fnClearInterval();
            }
            if (autoClose) {
                this.intervalID = this.fnRemoveLoading();
            }
        },
        fnLookAutoComplete: function (elem, data, fnc) {
            var Util = this,
                $elem = $(elem),
                page = $elem.data('page');

            if (elem === '#emp_rubro') {
                fnc = function (suggestion) {
                    if (suggestion.value.length) {
                        $elem.data('rubro', suggestion.value);
                    }
                };
            }

            fnc = fnc || (page ? this.fnGetSuggestionForRoute : this.fnGetSuggestion);
            $elem.autocomplete({
                lookup: data,
                appendTo: Util.appendTo,
                lookupLimit: 12,
                autoSelectFirst: true,
                minChars: 3,
                width: elem == '#txtSearchEnterprice' ? 500 : 360,
                tabDisabled: true,
                onSelect: fnc
            });
        },
        fnAutoComplete: function (elem, page) {
            var options = {
                serviceUrl: Util.__baseFullUrl() + page,
                delimiter: /(,|;)\s*/,
                width: 300,
                minChars: 2,
                appendTo: this.appendTo,
                onSelect: this.fnGetSuggestionForEnterprice
            };

            $(elem).autocomplete(options);
        },
        fnDisposeAutoComplete: function ($obj) {
            $obj.autocomplete('dispose');
        },
        fnMensajeErrorModal: function ($modal, message) {
            var $div = $modal.find('div.error-message'),
                template = _.template($('#tplModalErrorMessage').html());
            if ($div.children().length) {
                $div.empty();
            }
            $div.html(template({message: message}));

            clearInterval(Util.intervalModalError);
            Util.intervalModalError = setInterval(Util.fnRemoveModalMensajeError, 11000);
        },
        fnRemoveModalMensajeError: function () {
            $('div.modal .error-message').empty();
        },
        fnObservacion: function (e) {
            e.preventDefault();
            var $this = $(this), $textarea = $this.next();
            if ($textarea.hasClass('hidden')) {
                $textarea.removeClass('hidden').prop('disabled', false).focus();
                $this.children().removeClass('fa-plus').addClass('fa-minus');
            } else {
                $textarea.addClass('hidden').prop('disabled', true);
                $this.children().removeClass('fa-minus').addClass('fa-plus');
            }
        },
        fnGetTextFromSelect: function (obj) {
            return $(obj.selectedOptions).text().trim();
        },
        fnResetAddSelectedSelect: function ($select, value) {
            value = value || $select.val();
            $select.children().attr('selected', false);
            if (!value) {
                $select.val(value).children().first().attr('selected', true);
            } else {
                $select.val(value).children().filter('[value=' + value + ']').attr('selected', true);
            }
        },
        fnCallbackFail: function (mc, resp, options) {
            resp = resp == 'error' ? mc : resp;
            if (resp.responseJSON) {
                if (resp.responseJSON.redirect) {
                    alert(resp.responseJSON.error_message);
                    location.href = resp.responseJSON.redirect;
                } else if (resp.responseJSON.type == 4) {
                    Util.fnModalAlert(resp.responseJSON.error_message);
                } else if (resp.responseJSON.fields_error) {
                    var error_message = '<ul>';
                    for (var i = 0; i < resp.responseJSON.fields_error.length; i++) {
                        error_message += '<li>' + resp.responseJSON.fields_error[i] + '</li>';
                    }
                    error_message += '</ul>';
                    Util.fnModalAlert(error_message);
                } else {
                    alert(resp.responseJSON.error_message);
                }
            } else {
                alert('Sucedió un error inesperado, contacte con sistemas.');
            }
            Util.fnEnableAllControls(options);
            Util.fnRemoveLoadingNow();
        },
        fnGetDaysInMonth: function (month, anio) {
            return new Date(anio || new Date().getFullYear(), month, 0).getDate();
        },
        /**
         * Obtiene el objeto jQuery de una de las opciones pasadas como parametro
         */
        fnGetDomOptionFromSelect: function ($fieldSelect, val) {
            var fieldSelect = $fieldSelect[0], //Dom Object
                returnOption;
            if (fieldSelect.tagName === 'SELECT') {
                $fieldSelect.children().each(function (id, el) {
                    if (el.value == val) {
                        returnOption = el;
                        return false;
                    }
                });
            } else {
                throw 'Not a select field';
            }
            return returnOption;
        },
        fnDisabledButton: function ($btn) {
            if (!$btn.is(':disabled')) {
                $btn.prop('disabled', true);
            }
            return $btn;
        },
        fnEnableButton: function ($btn) {
            if ($btn.is(':disabled')) {
                $btn.prop('disabled', false);
            }
            return $btn;
        },
        setLoading: function (txt, icon, size) {
            icon = icon || 'circle-o-notch';
            size = size || '';
            txt = txt || 'Cargando...';
            var tmpLoading = _.template($('#icon-info-loading').html());
            return tmpLoading({icon: icon, icon_size: size, txt: txt});
        },
        fnToggleButtom: function (icon, message) {
            icon = icon || 'times';
            message = message || 'Cancelar';
            var tmpBottom = _.template($('#tmpBotonIcon').html());
            return tmpBottom({icon: icon, txt: message});
        },
        navigateTo: function (url, options) {
            options = $.extend({}, {trigger: true}, options || {});
            Backbone.history.navigate(url, options);
        },
        fnModalAlert: function ($message) {
            var $modal = $('#modal-alert');
            $modal.modal('show').find('.modal-body p').html($message);
        },
        updCurrentHoursInService: function (resp) {
            resp.tipo = resp.tipo.toUpperCase();
            if (resp.tipo == 'P') {
                $('#hp').text(resp.horas);
            } else if (resp.tipo == 'R') {
                $('#hr').text(resp.horas);
            } else if (resp.tipo === 'N') {
                $('#cc').text(resp.total);
            }
        },
        fnTwoDecimals: function (monto) {
            return parseFloat(monto).toFixed(2);
        },
        fnEnableAllControls: function (options) {
            if (options.inputs) {
                options.inputs.prop('disabled', false);
                return;
            }

            if (options.form) {
                $(options.form + ' :input').prop('disabled', false);
            }
        },
        fnMostrarMensaje: function (e) {
            e.preventDefault();
            var $this = $(this), $tr = $this.closest('tr').next();
            if ($tr.hasClass('hidden')) {
                $tr.removeClass('hidden');
                $this.text('Cerrar');
            } else {
                $tr.addClass('hidden');
                $this.text('Ver mas');
            }
        },
        fnExecFromParamsSaved: function (data, tag, View, fnc, notEmpresaId) {
            var $mainPage = $(tag),
                params = $mainPage.data('params'), // Obtengo los filtros guardados
                isArr = params !== undefined ? true : false, // Si no hay filtros isArr es falso
                flag = true,
                filtered;

            View.fnSaveFiltersSearch(data);
            if (isArr) {
                params = $.parseJSON(params); // Parseo a JSON

                if (notEmpresaId) {
                    if (data.empresa_id > 0) {
                        filtered = params.filter(function (rec) {
                            return rec.empresa_id == data.empresa_id;
                        });
                    } else if (data.anio > 0) {
                        filtered = params.filter(function (rec) {
                            return rec.anio == data.anio;
                        });
                    } else {
                        filtered = params;
                    }
                } else {
                    // Para una optimizacion y mejor rendimiento, filtro solo los parametros para esta empresa, si es que los hubiera
                    filtered = params.filter(function (rec) {
                        return rec.empresa_id === data.empresa_id;
                    });
                }

                for (var i = 0; i < filtered.length; i++) {

                    if (fnc(filtered, data, i)) {
                        View.render();
                        flag = false;
                        break;
                    }
                }
            }

            if (notEmpresaId && (data.empresa_id == '0' || data.empresa_id === '')) {
                data.empresa_id = 0;
            }
            if (flag) {
                // Cuando es a primera busqueda de facturas de esta empresa, no tiene filtros guardados anteriormente
                // se inicializa "params" en un Array, si lo tuviera ya estaria parseado en un JSON
                params = isArr ? params : [];
                params.push(data); // agrego un dato al Array
                $mainPage.data('params', JSON.stringify(params));
            }

            return flag;
        },
        __baseFullUrl: function () {
            return url_app + '/'; // Variable Global declarada en el header.tpl.php
        },
        fnGetSuggestion: function (suggestion) {
            var $this = $(this);
            Util.fnAddCustomEventToAuto($this, suggestion, null, true);
        },
        fnGetSuggestionForEnterprice: function (suggestion) {
            var $this = $(this);
            Util.fnAddCustomEventToAuto($this, suggestion, null, false);
        },
        fnGetSuggestionForRoute: function (suggestion) {
            var $this = $(this);
            Util.fnAddCustomEventToAuto($this, suggestion, $this.data('page'), false, true);
        },
        fnAddCustomEventToAuto: function ($this, suggestion, route, load, postBack) {
            var $groupBtn = $this.next(),
                $form = $this.prop('readonly', true).closest('form');
            if ($groupBtn.hasClass('not-visible')) {
                $groupBtn.removeClass('not-visible').children().prop('disabled', false)
                    .off('click').on('click', function (e) {
                    e.preventDefault();
                    $(this).prop('disabled', true).parent().addClass('not-visible').prev().val('').prop('readonly', false)
                        .closest('form').children('[name=empresa_id]').val(0).end().end().focus();
                    if (route) {
                        Util.navigateTo(route, {trigger: false});
                        $form.trigger('reset');
                        $form.submit();
                    } else if (load) {
                        $form.submit();
                    } else {
                        $form.find(':submit:last').prop('disabled', true);
                    }
                });
            }
            $form.children('[name=empresa_id]').val(suggestion.data);
            if (route) {
                $form.find('#anio_cor').val('');
                $form.find('.cbo_mes').val('');
                if (postBack && Backbone.history.getFragment() != route + '-' + suggestion.data) {
                    Util.navigateTo(route + '-' + suggestion.data);
                } else {
                    $form.submit();
                }
            } else if (load) {
                $form.submit();
            } else {
                $form.find(':submit:last').prop('disabled', false);
            }
        },
        fnToogleModalControls: function (state) {
            state = state || false;
            var $inputs = this.form.find(':input');
            $inputs.prop('disabled', state);
        },
        fnPusher: function (myEvent, fnc) {
            var pusher = new Pusher(keyp);
            var channel = pusher.subscribe('centros');
            fnc = fnc || function (data) {
                    Util.fnModalAlert(data.message);
                };
            channel.bind(myEvent, fnc);
        },
        fnGetBarNotifications: function () {
            Notification.fnInitBar(Util);
            Notification.isLoaded = true;
        },
        fnAddNotification: function (values) {
            if (values && !values.noNotify) {
                Notification.fnAdd(values);
            }
        },
        fnEscapeNl2br: function (text) {
            return text.replace(/\n/g, '<br>');
        },
        fnSetLoadingTable: function ($table, message) {
            var templateRow = _.template($('#loading-row').html());
            $table.html(templateRow({message: this.setLoading(message, 'spinner', 'fa-lg')}));
        },
        setPageTitle: function (message) {
            var $title = $('title');
            if (this.usuario_name === null) {
                this.usuario_name = $title.data('user');
            }
            $title.html(message + ' | ' + this.usuario_name + ' :: CentrosVirtuales');
        },
        setGenericCount: function (t, tag, start, total) {
            var $badge = $('#' + tag + ' span');
            start = start || false;
            if (start) {
                total = t;
                $badge.text(total);
                if (t > 0) {
                    $badge.addClass('bg-red');
                }
            } else {
                total += t;
                if (total >= 0) {
                    $badge.text(total).addClass('bg-red');
                }
                if (total === 0) {
                    $badge.removeClass('bg-red');
                }
            }
            return total;
        },
        fnLoadTotals: function (Feedback, Auditorio, Mensaje, HorasExtra) {
            var promise = {};
            $.getJSON(this.__baseFullUrl() + 'home/totals', function (rec) {
                Feedback.setTotal(rec.feedbacks, true);
                Auditorio.setTotal(rec.auditorios, true);
                Mensaje.setTotal(rec.mensajes, true);
                HorasExtra.setTotal(rec.horas_extra, true);
            }).fail(Util.fnCallbackFail);
        },
        fnRemoveHiddenClass: function ($obj) {
            if ($obj.hasClass('hidden')) {
                $obj.removeClass('hidden');
            }
            return $obj;
        },
        fnAddHiddenClass: function ($obj) {
            if (!$obj.hasClass('hidden')) {
                $obj.addClass('hidden');
            }
            return $obj;
        },
        fnSetPaginator: function (total, page, tag) {
            var perPage = Util.limit * page,
                size = Math.ceil(total / Util.limit),
                html = '<ul class="pagination pagination-sm pull-right">',
                paginatorInfo = '',
                number = 0,
                start = 0;

            if (page > 1) {
                html += '<li data-page="' + (page - 1) + '"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            } else {
                html += '<li class="disabled"><span aria-hidden="true">&laquo;</span></li>';
            }
            for (var i = 0; i < size; i++) {
                number = (i + 1);
                html += '<li ' + (number == page ? 'class="active"' : '') + ' data-page="' + number + '"><a href="#">' + number + '</a></li>';
            }

            if (number == page) {
                html += '<li class="disabled"><span aria-hidden="true">»</span></li>';
            } else {
                html += '<li data-page="' + (page + 1) + '"><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>';
            }
            html += '</ul>';

            start = Util.limit * (page - 1);
            if (perPage > total) {
                perPage = total;
            }
//            paginatorInfo = '<div class="pull-left" style="margin-top:27px">' + (start === 0 ? 1 : start) + ' - ' + perPage + ' de ' + total + ' Registros Encontrados</div>';
            paginatorInfo = '<div class="pull-left">'
                + '<ul class="pagination pagination-sm pull-right">'
                + '<li class="disabled  text-center"><span style="background-color: #f8f8f8; color: #000000" aria-hidden="true">' + (start === 0 ? 1 : start) + '</span></li>'
                + '<li class="disabled  text-center"><span style="width: 50px;" aria-hidden="true">hasta</span></li>'
                + '<li class="disabled  text-center"><span style="background-color: #f8f8f8; color: #000000" aria-hidden="true">' + perPage + '</span></li>'
                + '<li class="disabled  text-center"><span style="width: 50px;" aria-hidden="true">de</span></li>'
                + '<li class="disabled  text-center"><span style="background-color: #f8f8f8; color: #000000"  aria-hidden="true">' + total + '</span></li>'
                + '<li class="disabled  text-center"><span style="width: 150px;" aria-hidden="true">registros encontrados</span></li>'
                + '</ul>'
                + '</div>';
            $('#' + tag).html(paginatorInfo + html);
            return {start: start, page: perPage};
        },
        fnSetEventToPaginate: function (tag, view) {//devuelve el numero de pagina en el "li"
            $(tag).on('click', 'li', function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass('disabled') || $this.hasClass('active')) {
                    return false;
                }
                view.render($this.data('page'));
            });
        },
        getCurrentNumberPaginate: function (tag) {
            var page = $('#' + tag + ' li.active').data('page');
            return typeof page == 'undefined' ? 1 : page;
        },
        fnFireReserSelectedByAutocomplete: function ($form) {
            $form.find('.btn-danger').click();
        },
        fnLoadForAuto: function ($form, fnc, obj, collection, url, callback) {
            var estado = $('#cboStatus').val(),
                loading_msg = 'Cargando lista...';

            if (!collection) {
                var $inputs = $form.find(':input');
                $inputs.prop('disabled', true);
                Util.fnBarLoading(loading_msg);
                var Collection = Backbone.Collection.extend({
                    url: Util.__baseFullUrl() + 'companies/' + url,
                    initialize: function () {
                        this.on('error', this.myError, this);
                        this.fnGetAll();
                    },
                    myError: Util.fnCallbackFail,
                    fnGetAll: function () {
                        if (estado === 'E') {
                            obj.listDeletes = true;
                        }
                        this.fetch({
                            data: {preferencia_estado: estado},
                            success: function (data) {
                                $inputs.prop('disabled', false);
                                Util.fnRemoveLoadingNow();
                                Util.fnLookAutoComplete('#txtSearchEnterprice', Util.filtrado(data, estado), fnc);
                                $form.find('[name=search]').focus();
                                callback(data);
                            }
                        });
                    }
                });
                collection = new Collection();
            } else {
                if (estado == 'E' && !obj.listDeletes) {
                    obj.listDeletes = true;
                    Util.fnBarLoading(loading_msg);
                    collection.fetch({
                        data: {preferencia_estado: estado},
                        merge: true,
                        remove: false,
                        success: function (data) {
                            Util.fnRemoveLoadingNow();
                            Util.fnLookAutoComplete('#txtSearchEnterprice', Util.filtrado(data, estado), fnc);
                            callback(data);
                        }
                    });
                } else {
                    Util.fnLookAutoComplete('#txtSearchEnterprice', Util.filtrado(collection, estado), fnc);
                }
            }
        },
        // Solo se usa para el filtrado de estados en las colecciones de autocompletado de Representantes y Empleados (En Listado empresas)
        filtrado: function (collection, estado) {
            var result = collection.where({preferencia_estado: estado});
            return result.map(function (obj) {
                return obj.toJSON();
            });
        },
        updateNextInvoices: function ($obj, next_date) {
            $obj.find('li').each(function (id, el) {
                var $el = $(el);
                if (id == 1) {
                    $el.closest('ul').find('.divider').remove();
                }
                if ($el.hasClass('disabled')) {
                    $el.removeClass('disabled');
                }
                if ($el.text().trim() == next_date) {
                    $el.addClass('disabled');
                    $('<li class="divider" role="separator"></li>').insertBefore($el);
                    $('<li class="divider" role="separator"></li>').insertAfter($el);
                }
            });
        },
        fnGo: function (urlparam) {
            return window.location = this.urlRoot + urlparam;
        }
    };

    Util.start();

    return Util;
});