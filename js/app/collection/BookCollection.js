define(['jquery', 'backbone', 'app/model/BookModel'], function($, Backbone, BookModel){

    var BookCollection = Backbone.Collection.extend({

        model: BookModel,

        url: 'rest/books.php',

        initialize: function(models, options) {
            this.type = options.type;
        }

        // // override sync, fetch calls sync method
        // sync: function(method, model, options) {
        //     var self = this;
        //     return self;
        // }
    });

    return BookCollection;
});
