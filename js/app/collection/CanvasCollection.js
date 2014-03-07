define([
    'jquery',
    'backbone'
],
function($, Backbone ){

    var BookCollection = Backbone.Collection.extend({

        model: null,

        // url: 'rest/books.php',

        jsonArray: [

            { 'canvas': '1', 'type': 'basic' },

            { 'canvas': '2', 'type': 'skel' }

        ],

        initialize: function(models, options) {
            console.log('initialize CanvasCollection.js');

            var self = this;

            self.collection = _.filter( self.jsonArray, function(obj){
                return obj.canvas;
            });
            // console.log(self.collection);

            self.trigger( 'added' );

            return self;
        }
    });

    return BookCollection;
});
