define([
    'jquery',
    'backbone',
    'app/collection/CanvasCollection',
    'app/view/CanvasListView',
    'app/view/CanvasView',
    'app/view/Canvas2View'
],
function($, Backbone, CanvasCollection, CanvasListView, CanvasView, Canvas2View){

    var AppRouter = Backbone.Router.extend({

        initialize: function(){
            console.log('itialize AppRouter.js');
        },

        routes: {
            '': 'showCanvasList',
            'canvas/:id': 'showCanvas'
        },

        showCanvasList: function(){
            var self = this;
            var collection = new CanvasCollection();
            var view = new CanvasListView({ collection: collection });
        },

        showCanvas: function( id ){
            console.log('route showCanvas');

            var self = this;

            switch ( id ) {

                case 'basic':
                    var view = new CanvasView();
                    break;

                case 'skel':
                    var view = new Canvas2View();
                    break;

                default:
                    console.log('default');
                    break;
            }

            // view.model.trigger('added');
        }
    });

    return AppRouter;
});
