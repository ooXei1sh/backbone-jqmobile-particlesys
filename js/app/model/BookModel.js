define([
    'jquery',
    'backbone'
],
function($, Backbone){

    var BookModel = Backbone.Model.extend({

        urlRoot: 'rest/book.php',

        initialize: function(){
            console.log('initialize BookModel.js');
        },

        defaults: {
            name: 'Untitled',
            author: 'Unknown',
            year: '1969-12-31'
        },

        validate: function(attrs){
        },

        // override sync, .fetch calls sync method
        // sync: function(method, model, options) {

        //     console.log('sync BookModel.js');

        //     var
        //     self = this,
        //     deferred = $.Deferred();

        //     setTimeout(function(){

        //         options.success( {name:'foo'} );

        //         // self.trigger('added');

        //         deferred.resolve();

        //     }, 1000);

        //     return deferred;
        // },

        parse: function(response, xhr){
            // console.log(xhr);
            // console.log(response);
            return response;
        }
    });

    return BookModel;
});
