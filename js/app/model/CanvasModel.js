define([
    'jquery',
    'backbone'
],
function($, Backbone ){

    var CavasModel = Backbone.Model.extend({

        urlRoot: '/backbone-jqmobile-particlesys/ajax/CanvasModel.php',

        initialize: function(){
        }

        // defaults:
        // {
        //     'canvas': '0',
        //     'type': 'base',
        //     'fields': {
        //         'select': [
        //             {
        //                 'type': 'base',
        //                 'name': 'bgcolor',
        //                 'label': 'Background',
        //                 'options': [
        //                     {
        //                         'label': 'Black',
        //                         'value': 'k',
        //                         'selected': 'selected=selected'
        //                     },
        //                     {
        //                         'label': 'White',
        //                         'value': 'white',
        //                         'selected': ''
        //                     },
        //                     {
        //                         'label': 'Cyan',
        //                         'value': 'c',
        //                         'selected': ''
        //                     },
        //                     {
        //                         'label': 'Magenta',
        //                         'value': 'm',
        //                         'selected': ''
        //                     },
        //                     {
        //                         'label': 'Yellow',
        //                         'value': 'y',
        //                         'selected': ''
        //                     },
        //                     {
        //                         'label': 'Red',
        //                         'value': 'red',
        //                         'selected': ''
        //                     },
        //                     {
        //                         'label': 'Green',
        //                         'value': 'green',
        //                         'selected': ''
        //                     },
        //                     {
        //                         'label': 'Blue',
        //                         'value': 'blue',
        //                         'selected': ''
        //                     }
        //                 ]
        //             }
        //         ],
        //         'controlgroup': [
        //             {
        //                 'type': 'base',
        //                 'name': 'random',
        //                 'label': 'Random',
        //                 'checked': '',
        //                 'value': 1
        //             }
        //         ],
        //         'rangeslider': [
        //             {
        //                 'type': 'base',
        //                 'label': 'Size',
        //                 'attr': {
        //                     'min': 1,
        //                     'max': 10
        //                 },
        //                 'inputmin': {
        //                     'name': 'sizemin',
        //                     'value': 1
        //                 },
        //                 'inputmax': {
        //                     'name': 'sizemax',
        //                     'value': 1
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'label': 'Alpha',
        //                 'attr': {
        //                     'min': 1,
        //                     'max': 10
        //                 },
        //                 'inputmin': {
        //                     'name': 'alphamin',
        //                     'value': 10
        //                 },
        //                 'inputmax': {
        //                     'name': 'alphamax',
        //                     'value': 10
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'label': 'Speed',
        //                 'attr': {
        //                     'min': 1,
        //                     'max': 10
        //                 },
        //                 'inputmin': {
        //                     'name': 'speedmin',
        //                     'value': 1
        //                 },
        //                 'inputmax': {
        //                     'name': 'speedmax',
        //                     'value': 1
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'label': 'Grow',
        //                 'attr': {
        //                     'min': 1,
        //                     'max': 10
        //                 },
        //                 'inputmin': {
        //                     'name': 'growmin',
        //                     'value': 0
        //                 },
        //                 'inputmax': {
        //                     'name': 'growmax',
        //                     'value': 0
        //                 }
        //             }
        //         ],
        //         'range': [
        //             {
        //                 'type': 'base',
        //                 'name': 'gravity',
        //                 'label': 'Gravity',
        //                 'attr': {
        //                     'min': -100,
        //                     'max': 100,
        //                     'value': 0,
        //                     'data-highlight': false
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'name': 'fade',
        //                 'label': 'Fade',
        //                 'attr': {
        //                     'min': 0,
        //                     'max': 100,
        //                     'value': 10,
        //                     'data-highlight': true
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'name': 'scatterx',
        //                 'label': 'Scatter X',
        //                 'attr': {
        //                     'min': 0,
        //                     'max': 320,
        //                     'value': 0,
        //                     'data-highlight': true
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'name': 'scattery',
        //                 'label': 'Scatter Y',
        //                 'attr': {
        //                     'min': 0,
        //                     'max': 320,
        //                     'value': 0,
        //                     'data-highlight': true
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'name': 'colorr',
        //                 'label': 'R',
        //                 'attr': {
        //                     'min': 0,
        //                     'max': 255,
        //                     'value': 255,
        //                     'data-highlight': true
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'name': 'colorg',
        //                 'label': 'G',
        //                 'attr': {
        //                     'min': 0,
        //                     'max': 255,
        //                     'value': 255,
        //                     'data-highlight': true
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'name': 'colorb',
        //                 'label': 'B',
        //                 'attr': {
        //                     'min': 0,
        //                     'max': 255,
        //                     'value': 255,
        //                     'data-highlight': true
        //                 }
        //             },
        //             {
        //                 'type': 'base',
        //                 'name': 'colorvariant',
        //                 'label': 'Color Variant',
        //                 'attr': {
        //                     'min': 1,
        //                     'max': 100,
        //                     'value': 1,
        //                     'data-highlight': true
        //                 }
        //             }
        //         ]
        //     }
        // },

    });

    return CavasModel;
});
