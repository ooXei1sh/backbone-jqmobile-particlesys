// http://stackoverflow.com/questions/7172294/backbone-js-and-jquerymobile-routing-without-hack-or-other-router/7196257#7196257

define(['jquery', 'backbone', 'app/model/BookModel', 'app/collection/BookCollection', 'app/view/BooksView', 'app/view/BookView'],
function($, Backbone, BookModel, BookCollection, BooksView, BookView){

    var AppRouter = Backbone.Router.extend({

        initialize: function(){
            // console.log('itialize router');

            // window.location.hash = '';

            // prevent refresh
            $(document).on('click', 'a:not([data-bypass])', function(e) {
                var href = $(this).attr('href');
                var protocol = this.protocol + '//';

                if (href && href.slice(0, protocol.length) !== protocol && href.indexOf('javascript:') !== 0) {
                    e.preventDefault();
                    Backbone.history.navigate(href, true);
                }
            });
        },

        routes: {
            '': 'viewBooks',
            'book/:id': 'viewBook'
        },

        viewBooks: function(){
            $.mobile.changePage('#books', {reverse: false, changeHash: false});
        },

        viewBook: function(id){

            var self = this;

            var data = $.param({
                id: id
            });

            book = new BookModel();

            $.mobile.loading('show');

            book.fetch({

                data: data,

                success: function(model, response, options){

                    // console.log('inside app router success');

                    // console.log(model);
                    // console.log(response);
                    // console.log(options);

                    $.each(response[0], function(k, v){
                        model.set(k, v);
                    });

                    var view = new BookView({ model: model });

                    view.model.trigger('added');

                    $.mobile.changePage('#page-book', {reverse: false, changeHash: false});

                },
                error: function(model, xhr, options){
                    console.log('No results found.');
                }
            });
        }
    });

    return AppRouter;

});
