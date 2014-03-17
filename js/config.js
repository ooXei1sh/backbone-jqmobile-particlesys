require.config({
    paths: {
        'jquery': 'vendor/jquery-1.10.2.min',
        'jquerymobileconf': 'jquerymobile.conf',
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
    },

    // http://stackoverflow.com/questions/17279077/jquery-mobile-application-with-require-js-and-sammy
    waitSeconds: 60
});

require([
    'jquery',
    'backbone',
    'jquerymobileconf',
    'jquerymobile',
    'app/router/AppRouter',
    'src'
],
function($, Backbone, Mobile, AppRouter){
});
