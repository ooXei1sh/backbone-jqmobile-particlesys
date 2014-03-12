require([
    'jquery',
    'backbone',
    'jquerymobile',
    'app/router/AppRouter',
    'src'
],
function($, Backbone, Mobile, AppRouter){
    // console.log('app.js');

    $(function() {
        var router = new AppRouter();
        Backbone.history.start({
            // .htaccess and root below must be set
            pushState: true,
            root: '/backbone-jqmobile-particlesys'
        });
    });

});
