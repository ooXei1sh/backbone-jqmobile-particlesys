define([
    'jquery',
    'backbone',
    'app/model/ParticleModel'
],
function($, Backbone, ParticleModel){

    var ParticleCollection = Backbone.Collection.extend({

        model: ParticleModel,

        url: '/backbone-jqmobile-particlesys/ajax/ParticleCollection.php',

        initialize: function() {

            // console.log('initialize ParticleCollection.js');

        }
    });

    return ParticleCollection;
});

