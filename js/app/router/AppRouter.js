define([
    'jquery',
    'backbone',
    'app/collection/CanvasCollection',
    'app/view/CanvasListView',
    'app/view/ParticleBaseView'
],
function($, Backbone, CanvasCollection, CanvasListView, ParticleBaseView){

    var AppRouter = Backbone.Router.extend({

        initialize: function(){
            // console.log('itialize AppRouter.js');
        },

        routes: {
            '': 'showCanvasList',
            'canvas/:type': 'showCanvas'
        },

        showCanvasList: function(){
            var
                self = this,
                collection = new CanvasCollection(),
                view = new CanvasListView({ collection: collection })
            ;
        },

        showCanvas: function( type ){
            // console.log('route showCanvas');

            var
                self = this,
                collection = new CanvasCollection()
            ;

            switch ( type ) {

                case 'base':
                    new ParticleBaseView({type: type, collection: collection});
                    break;

                case 'water':
                    new ParticleBaseView({type: type});
                    break;

                case 'fire':
                    new ParticleBaseView({type: type});
                    break;

                case 'plume':
                    new ParticleBaseView({type: type});
                    break;

            }

            // view.model.trigger('pagecreate');
        }
    });

    return AppRouter;
});
