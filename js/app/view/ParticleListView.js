define([
    'jquery',
    'backbone',
    'jquerymobile',
    'handlebars'
],
function($, Backbone, Mobile){

    var ParticleListView = Backbone.View.extend({

        el:'#particle-listview',

        template: Handlebars.compile( $('#particle-listview-template').html() ),

        initialize: function(){

            // console.log('initialize ParticleListView.js');

            var self = this;

            // console.log(self.collection);

            self.render();

        },

        render: function(){

            // console.log('render ParticleListView.js');

            var self = this;

            // console.log(self.collection.toJSON());

            var markup = self.template({ collection: self.collection.toJSON() });

            if ( self.collection.length > 1) {

                self.$el.html( markup );

            }
            else {

                self.$el.prepend( markup );

            }

            self.$el.trigger( 'create' );

            // jquery mobile event binding
            self.$el.on( 'collapsibleexpand', function( event, ui ){
                var id = $( event.target ).data( 'id' );
                if ( id !== 0 ){
                    Backbone.history.navigate( 'particle/' + id, true );
                }
            });

            // add new particle
            $('#btn-add-particle').on('click', function( event ){
                Backbone.history.navigate('particle/add', true);
            });

            return self;
        }
    });

    return ParticleListView;
});
