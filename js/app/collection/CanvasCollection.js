define([
    'jquery',
    'backbone',
    'app/model/CanvasModel'
],
function($, Backbone, CanvasModel){

    var CanvasCollection = Backbone.Collection.extend({

        model: CanvasModel,

        url: '/backbone-jqmobile-particlesys/ajax/CanvasCollection.php',

        initialize: function() {

            // console.log('initialize CanvasCollection.js');

        }
    });

    return CanvasCollection;
});

