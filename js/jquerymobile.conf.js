define([
    'jquery'
],
function($){

    $(document).on('mobileinit', function(){
        // http://api.jquerymobile.com/global-config/
        $.mobile.page.prototype.options.theme  = 'b';
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
    });
});
