define([
    'jquery',
    'backbone',
    'app/collection/ParticleCollection',
    'app/model/ParticleModel',
    'app/view/ParticleListView',
    'app/view/ParticleView'
],
function($, Backbone, ParticleCollection, ParticleModel, ParticleListView, ParticleView){

    var AppRouter = Backbone.Router.extend({

        initialize: function(){
            // console.log('itialize AppRouter.js');
        },

        routes: {
            '': 'showParticleList',
            'particle/add': 'addParticle',
            'particle/:id': 'showParticle'
        },

        showParticleList: function(){

            // console.log('route showParticleList');

            var self = this;

            var data = $.param({
                limit: 10
            });

            var list = new ParticleCollection();

            list.fetch({

                data: data,

                success: function(collection, response, options){

                    var view = new ParticleListView({ collection: collection });

                },
                error: function(collection, xhr, options){
                    console.log(collection);
                    console.log(xhr);
                    console.log(options);
                }
            });

        },

        showParticle: function( id ){

            // console.log('route showParticle');

            var self = this;

            var item = new ParticleModel();

            item.set('id', id);

            item.fetch({

                success: function(model, response, options){

                    var view = new ParticleView({ model: model });

                    view.model.trigger('add');

                },
                error: function(model, xhr, options){
                    console.log(model);
                    console.log(xhr);
                    console.log(options);
                }
            });
        },

        addParticle: function(){

            // console.log('route addParticle');

            // only add one particle at a time..
            // @todo: add multiple particles at a time, could be all int id based
            if (!$('#particle-listview div a:contains("add")').length){

                var model = new ParticleModel();

                // console.log(model);

                var view = new ParticleView({ model: model });

                var collection = new ParticleCollection();

                collection.add(model);

                // console.log(collection);

                var view = new ParticleListView({ collection: collection });

                // add button
                $('#particle-listview div a:contains("add")').trigger('click');

                model.trigger('add');
            }
        }

    });

    return AppRouter;
});
