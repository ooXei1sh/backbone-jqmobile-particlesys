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
                    'selected': select === 'white' ? 'selected="selected"' : ''
                },
                {
                    'label': 'Cyan',
                    'value': 'c',
                    'selected': select === 'c' ? 'selected="selected"' : ''
                },
                {
                    'label': 'Magenta',
                    'value': 'm',
                    'selected': select === 'm' ? 'selected="selected"' : ''
                },
                {
                    'label': 'Yellow',
                    'value': 'y',
                    'selected': select === 'y' ? 'selected="selected"' : ''
                },
                {
                    'label': 'Black',
                    'value': 'k',
                    'selected': select === 'k' ? 'selected="selected"' : ''
                },
                {
                    'label': 'Red',
                    'value': 'red',
                    'selected': select === 'red' ? 'selected="selected"' : ''
                },
                {
                    'label': 'Green',
                    'value': 'green',
                    'selected': select === 'green' ? 'selected="selected"' : ''
                },
                {
                    'label': 'Blue',
                    'value': 'blue',
                    'selected': select === 'blue' ? 'selected="selected"' : ''
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
                                'name': 'color',
                                'label': 'Foreground',
                                'options': self.colorsArray('white')
                            },
                            {
                                'type': 'base',
                                'name': 'bgcolor',
                                'label': 'Background',
                                'options': self.colorsArray('k')
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
                                'name': 'speed',
                                'label': 'Speed',
                                'attr': self.rangeArray(1,100,1)
                            },
                            {
                                'type': 'base',
                                'name': 'size',
                                'label': 'Size',
                                'attr': self.rangeArray(1,100,1)
                            },
                            {
                                'type': 'base',
                                'name': 'alpha',
                                'label': 'Alpha',
                                'attr': self.rangeArray(1,9,8)
                            }
                        ]
                    }
                },

                {
                    'canvas': '2',
                    'type': 'water',
                    'fields': {
                        'select': [
                            {
                                'type': 'water',
                                'name': 'color',
                                'label': 'Foreground',
                                'options': self.colorsArray('white')
                            },
                            {
                                'type': 'water',
                                'name': 'bgcolor',
                                'label': 'Background',
                                'options': self.colorsArray('c')
                            }
                        ],
                        'range': [
                            {
                                'type': 'water',
                                'name': 'gravity',
                                'label': 'Gravity',
                                'attr': self.rangeArray(-100,100,50)
                            },
                            {
                                'type': 'water',
                                'name': 'speed',
                                'label': 'Speed',
                                'attr': self.rangeArray(1,100,23)
                            },
                            {
                                'type': 'water',
                                'name': 'size',
                                'label': 'Size',
                                'attr': self.rangeArray(1,100,23)
                            },
                            {
                                'type': 'water',
                                'name': 'alpha',
                                'label': 'Alpha',
                                'attr': self.rangeArray(1,9,7)
                            }
                        ]
                    }
                },

                {
                    'canvas': '3',
                    'type': 'fire',
                    'fields': {
                        'select': [
                            {
                                'type': 'fire',
                                'name': 'color',
                                'label': 'Foreground',
                                'options': self.colorsArray('y')
                            },
                            {
                                'type': 'fire',
                                'name': 'bgcolor',
                                'label': 'Background',
                                'options': self.colorsArray('k')
                            }
                        ],
                        'range': [
                            {
                                'type': 'fire',
                                'name': 'gravity',
                                'label': 'Gravity',
                                'attr': self.rangeArray(-100,100,-50)
                            },
                            {
                                'type': 'fire',
                                'name': 'speed',
                                'label': 'Speed',
                                'attr': self.rangeArray(1,100,1)
                            },
                            {
                                'type': 'fire',
                                'name': 'size',
                                'label': 'Size',
                                'attr': self.rangeArray(1,100,13)
                            },
                            {
                                'type': 'fire',
                                'name': 'alpha',
                                'label': 'Alpha',
                                'attr': self.rangeArray(1,9,9)
                            }
                        ]
                    }
                }
            ];
        },

        initialize: function(models, options) {
            // console.log('initialize CanvasCollection.js');

            var self = this;

            json = self.jsonArray();

            self.collection = _.filter( json, function(obj){
                return obj.canvas;
            });

            self.trigger( 'added' );

            return self;
        }
    });

    return CanvasCollection;
});

