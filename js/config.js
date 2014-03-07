require.config({
    paths: {
        'jquery': 'vendor/jquery-1.10.2.min',
        'jquerymobile': 'vendor/jquery.mobile-1.4.0.min',
        'underscore': 'vendor/lodash',
        'handlebars': 'vendor/handlebars-v1.3.0',
        'backbone': 'vendor/backbone',
        'src': 'app/app'
    },

    // non amd compatible
    shim: {
        'backbone': {
              'deps': [ 'underscore', 'jquery' ],
              'exports': 'Backbone'  // attaches "Backbone" to the window object
        }
    }
});

require([
    'jquery',
    'backbone',
    'jquerymobile',
    'app/router/AppRouter',
    'src'
],
function($, Backbone, Mobile, AppRouter){
    $.mobile.page.prototype.options.theme  = "d";
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;

    // not working...
    // $(document).on('mobileinit', function(){
    //     console.log('!');
    //     // http://api.jquerymobile.com/global-config/
    //     $.mobile.page.prototype.options.theme  = 'b';
    // });

});
