define([
    'jquery',
    'backbone',
    'jquerymobile',
    'handlebars'
],
function($, Backbone, Mobile){

    var CanvasListView = Backbone.View.extend({

        el:'#canvas-listview',

        events:{
            'click .ajax-hl': 'routeToCanvas',
        },

        template: Handlebars.compile( $('#canvas-listview-template').html() ),

        initialize: function(){

            // console.log('initialize CanvasListView.js');

            var self = this;

            // console.log(self.collection);

            self.render();

        },

        render: function(){

            // console.log('render CanvasListView.js');

            var self = this;

            var markup = self.template({ collection: self.collection.toJSON() });

            if ( self.collection.length > 1) {

                self.$el.html( markup );

            }
            else {

                self.$el.prepend( markup );

            }

            self.$el.trigger( 'create' );

            // jquery mobile event bindings
            self.$el.on( 'collapsibleexpand', function( event, ui ){
                var data = $( event.target ).data();
                Backbone.history.navigate('canvas/'+data.type, true);
            });

            // add new particle
            $('#btn-add-particle').on('click', function( event ){
                var data = $( event.target ).data();
                Backbone.history.navigate('canvas/'+data.type, true);
            });

            return self;
        }
    });

    return CanvasListView;
});
