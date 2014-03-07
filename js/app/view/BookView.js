define([
    'jquery',
    'backbone',
    'jquerymobile',
    'handlebars'
],
function($, Backbone, Mobile){

    var BookView = Backbone.View.extend({

        el:'#book-view',

        template: Handlebars.compile( $('#book-view-template').html() ),

        initialize: function(){

            var self = this;

            $('#page-book').trigger('pagecreate');

            self.model.on('added', self.render, self);

        },

        render: function(){
            // console.log('render book view');

            var self = this;

            if (self.model !== 'undefined'){

                // console.log(self.model.get('id'));

                var markup = self.template({ item: self.model.toJSON() });

                self.$el.html(markup);

                self.$el.trigger('create');

            }

            return self;
        }
    });

    return BookView;
});
