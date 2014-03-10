define([
    'jquery',
    'backbone',
    'app/collection/CanvasCollection',
    'app/view/CanvasListView',
    'app/view/ParticleBaseView',
    'app/view/CanvasView',
    'app/view/Canvas2View'
],
function($, Backbone, CanvasCollection, CanvasListView, ParticleBaseView, CanvasView, Canvas2View){

    var AppRouter = Backbone.Router.extend({

        initialize: function(){
            // console.log('itialize AppRouter.js');
        },

        routes: {
            '': 'showCanvasList',
            'canvas/:type': 'showCanvas'
        },

        showCanvasList: function(){
            var self = this;
            var collection = new CanvasCollection();
            var view = new CanvasListView({ collection: collection });
        },

        showCanvas: function( type ){
            // console.log('route showCanvas');

            var self = this;

            switch ( type ) {

                case 'base':
                    new ParticleBaseView({type: type});
                    break;

                case 'water':
                    new ParticleBaseView({type: type});
                    break;

                case 'fire':
                    new ParticleBaseView({type: type});
                    break;

            }

            // view.model.trigger('added');
        }
    });

    return AppRouter;
});
