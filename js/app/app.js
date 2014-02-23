require(['jquery','backbone','jquerymobile','app/router/AppRouter','src'], function($, Backbone, Mobile, AppRouter){

    // console.log('inside app.js');

    $(function() {

        var router = new AppRouter();

        Backbone.history.start({
            // .htaccess and root prop below must be set
            pushState: true,
            root: '/jq-mobile-bbjs/server'
        });

    });

});
