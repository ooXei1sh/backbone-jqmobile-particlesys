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
            'canvas/add': 'addParticle',
            'canvas/:type': 'showCanvas'
        },

        showCanvasList: function(){

            // console.log('route showCanvasList');

            var self = this;

            var data = $.param({
                limit: 10
            });

            var collection = new CanvasCollection();

            collection.fetch({

                data: data,

                success: function(collection, response, options){

                    var view = new CanvasListView({ collection: collection });

                },
                error: function(collection, xhr, options){
                    console.log('No results found.');
                }
            });

        },

        addParticle: function(){

            // console.log('route addParticle');

            // only add one particle at a time..
            // @todo: add multiple particles at a time, could be all int id based
            if (!$('#canvas-listview div a:contains("add")').length){

                var model = new CanvasModel();

                // console.log(model);

                var view = new ParticleBaseView({ model: model });

                var collection = new CanvasCollection();

                collection.add(model);

                // console.log(collection);

                var view = new CanvasListView({ collection: collection });

                // add button
                $('#canvas-listview div a:contains("add")').trigger('click');

                model.trigger('add');
            }
        },

        showCanvas: function( type ){

            // console.log('route showCanvas');

            var self = this;

            // @todo use id here..
            var data = $.param({
                type: type
            });

            var model = new CanvasModel();

            model.fetch({

                data: data,

                success: function(model, response, options){

                    // passed params are available on self object in ParticleBaseView
                    var view = new ParticleBaseView({ model: model });

                    view.model.trigger('add');

                },
                error: function(model, xhr, options){
                    console.log('No results found.');
                }
            });
        }
    });

    return AppRouter;
});
