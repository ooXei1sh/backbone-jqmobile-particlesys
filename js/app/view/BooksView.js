define(['jquery', 'backbone', 'handlebars', 'app/model/BookModel', 'app/collection/BookCollection'], function($, Backbone, BookModel, BookCollection){

    var BooksView = Backbone.View.extend({

        el:'#book-listview',

        template: Handlebars.compile($('#book-listview-template').html()),

        initialize: function(){

            var self = this;

            self.book = new BookCollection();

            self.render();

            self.book.fetch({reset: true});

            self.listenTo(self.book, 'reset', self.render);

        },

        listItemClick: function(e){
            e.preventDefault();

        },

        render: function(){

            // this.template = _.template($('script#book').html(), {'collection': this.collection});
            // this.$el.find('ul').html(this.template);
            // return this;

            var self = this;

            if (self.book.models.length > 0){

                var markup = self.template({item: self.book.toJSON()});
                self.$el.append(markup);
                // $('#timeline .accordion').accordion();
            }
            return self;

        }
    });

    return BooksView;
});
