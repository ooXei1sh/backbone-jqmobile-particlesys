define([
    'jquery',
    'backbone',
    'app/collection/CanvasCollection',
    'app/model/CanvasModel',
    'app/view/CanvasListView',
    'app/view/ParticleBaseView'
],
function($, Backbone, CanvasCollection, CanvasModel, CanvasListView, ParticleBaseView){

    var AppRouter = Backbone.Router.extend({

        initialize: function(){
            // console.log('itialize AppRouter.js');
        },

        routes: {
            '': 'showCanvasList',
            'canvas/:type': 'showCanvas'
        },

        showCanvasList: function(){

            // console.log('route showCanvasList');

            var self = this;

            var data = $.param({
                limit: 10
            });

            list = new CanvasCollection();

            list.fetch({

                data: data,

                success: function(collection, response, options){

                    // console.log(collection);
                    // console.log(response);
                    // console.log(options);

                    var view = new CanvasListView({ collection: response });

                },
                error: function(collection, xhr, options){
                    console.log('No results found.');
                }
            });

        },

        showCanvas: function( type ){

            // console.log('route showCanvas');

            var self = this;

            // @todo use id here..
            var data = $.param({
                type: type
            });

            // @todo rename canvas to particle?
            item = new CanvasModel();

            item.fetch({

                data: data,

                success: function(model, response, options){

                    // console.log(model);
                    // console.log(response);
                    // console.log(options);

                    // passed params are available on self object in ParticleBaseView
                    var view = new ParticleBaseView({ model: model });

                    // view.model.trigger('added');

                },
                error: function(model, xhr, options){
                    console.log('No results found.');
                }
            });
        }
    });

    return AppRouter;
});
