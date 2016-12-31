define([
    "jquery",
    "underscore",
    "backbone",
], function ($, _, Backbone) {
    var ItemView = Backbone.View.extend({
        className: "item-wrap",
        eltwo: '#idTbody',
        initialize: function () {
            this.render();
            this.renderTwo();
            // console.log(this.template);
        },
        render: function () {
            console.log(this.model.toJSON());
            var template = _.template($('#itemTemplate').html());
            $(this.el).html(template(this.model.toJSON()));
            return this;
        },
        renderTwo:function () {
            var template = _.template($('#tplTbody').html());
            $(this.eltwo).html(template(this.model.toJSON()));
            return this;
        }
    });

    return ItemView;
});
