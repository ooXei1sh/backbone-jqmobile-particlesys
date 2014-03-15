define([
    'jquery',
    'backbone'
],
function($, Backbone ){

    var CanvasCollection = Backbone.Collection.extend({

        model: null,

        // url: 'rest/books.php',

        colorsArray: function(select){

            return [
                {
                    'label': 'White',
                    'value': 'white',
                    'selected': select === 'white' ? 'selected=selected' : ''
                },
                {
                    'label': 'Cyan',
                    'value': 'c',
                    'selected': select === 'c' ? 'selected=selected' : ''
                },
                {
                    'label': 'Magenta',
                    'value': 'm',
                    'selected': select === 'm' ? 'selected=selected' : ''
                },
                {
                    'label': 'Yellow',
                    'value': 'y',
                    'selected': select === 'y' ? 'selected=selected' : ''
                },
                {
                    'label': 'Black',
                    'value': 'k',
                    'selected': select === 'k' ? 'selected=selected' : ''
                },
                {
                    'label': 'Red',
                    'value': 'red',
                    'selected': select === 'red' ? 'selected=selected' : ''
                },
                {
                    'label': 'Green',
                    'value': 'green',
                    'selected': select === 'green' ? 'selected=selected' : ''
                },
                {
                    'label': 'Blue',
                    'value': 'blue',
                    'selected': select === 'blue' ? 'selected=selected' : ''
                }
            ];
        },

        rangeArray: function(min, max, value){

            return {
                'min': min,
                'max': max,
                'value': value
            };
        },

        jsonArray: function(){

            var self = this;

            return [
                {
                    'canvas': '1',
                    'type': 'base',
                    'fields': {
                        'select': [
                            {
                                'type': 'base',
                                'name': 'bgcolor',
                                'label': 'Background',
                                'options': self.colorsArray('k')
                            }
                        ],
                        'controlgroup': [
                            {
                                'type': 'base',
                                'name': 'random',
                                'label': 'Random',
                                'checked': 'checked=checked',
                                'value': 1
                            }
                        ],
                        'rangeslider': [
                            {
                                'type': 'base',
                                'label': 'Size',
                                'attr': self.rangeArray(1,100,1),
                                'inputmin': {
                                    'name': 'sizemin',
                                    'value': 2
                                },
                                'inputmax': {
                                    'name': 'sizemax',
                                    'value': 12
                                }
                            },
                            {
                                'type': 'base',
                                'label': 'Alpha',
                                'attr': self.rangeArray(0,10,1),
                                'inputmin': {
                                    'name': 'alphamin',
                                    'value': 6
                                },
                                'inputmax': {
                                    'name': 'alphamax',
                                    'value': 9
                                }
                            }
                        ],
                        'range': [
                            {
                                'type': 'base',
                                'name': 'gravity',
                                'label': 'Gravity',
                                'attr': self.rangeArray(-100,100,0)
                            },
                            {
                                'type': 'base',
                                'name': 'colorr',
                                'label': 'R',
                                'attr': self.rangeArray(0,255,255)
                            },
                            {
                                'type': 'base',
                                'name': 'colorg',
                                'label': 'G',
                                'attr': self.rangeArray(0,255,255)
                            },
                            {
                                'type': 'base',
                                'name': 'colorb',
                                'label': 'B',
                                'attr': self.rangeArray(0,255,255)
                            },
                            {
                                'type': 'base',
                                'name': 'colorvariant',
                                'label': 'Color Variant',
                                'attr': self.rangeArray(1,100,1)
                            },
                            {
                                'type': 'base',
                                'name': 'speed',
                                'label': 'Speed',
                                'attr': self.rangeArray(0,100,1)
                            },
                            {
                                'type': 'base',
                                'name': 'fade',
                                'label': 'Fade',
                                'attr': self.rangeArray(0,100,10)
                            },
                            {
                                'type': 'base',
                                'name': 'scatterx',
                                'label': 'Scatter X',
                                'attr': self.rangeArray(0,320,1)
                            },
                            {
                                'type': 'base',
                                'name': 'scattery',
                                'label': 'Scatter Y',
                                'attr': self.rangeArray(0,320,1)
                            },
                            {
                                'type': 'base',
                                'name': 'grow',
                                'label': 'Grow',
                                'attr': self.rangeArray(0,10,0)
                            }

                        ]
                    }
                }

            ];
        },

        initialize: function(models, options) {
            // console.log('initialize CanvasCollection.js');

            var
                self = this,
                json = self.jsonArray()
            ;

            self.collection = _.filter( json, function(obj){
                return obj.canvas;
            });

            self.trigger( 'added' );

            return self;
        }
    });

    return CanvasCollection;
});

