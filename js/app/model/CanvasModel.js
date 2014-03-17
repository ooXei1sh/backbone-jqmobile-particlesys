define([
    'jquery',
    'backbone'
],
function($, Backbone ){

    var CavasModel = Backbone.Model.extend({

        urlRoot: '/backbone-jqmobile-particlesys/ajax/CanvasModel.php',

        initialize: function(){
        },

        defaults:
        {
            'canvas': '0',
            'type': 'add',
            'field': {
                'select': [
                    {
                        'type': 'add',
                        'name': 'bgcolor',
                        'label': 'Background',
                        'options': [
                            {
                                'label': 'Black',
                                'value': 'k',
                                'selected': 'selected=selected'
                            },
                            {
                                'label': 'White',
                                'value': 'white',
                                'selected': ''
                            },
                            {
                                'label': 'Cyan',
                                'value': 'c',
                                'selected': ''
                            },
                            {
                                'label': 'Magenta',
                                'value': 'm',
                                'selected': ''
                            },
                            {
                                'label': 'Yellow',
                                'value': 'y',
                                'selected': ''
                            },
                            {
                                'label': 'Red',
                                'value': 'red',
                                'selected': ''
                            },
                            {
                                'label': 'Green',
                                'value': 'green',
                                'selected': ''
                            },
                            {
                                'label': 'Blue',
                                'value': 'blue',
                                'selected': ''
                            }
                        ]
                    }
                ],
                'controlgroup': [
                    {
                        'type': 'add',
                        'name': 'random',
                        'label': 'Random',
                        'checked': '',
                        'value': 1
                    }
                ],
                'rangeslider': [
                    {
                        'type': 'add',
                        'label': 'Size',
                        'attr': {
                            'min': 1,
                            'max': 10
                        },
                        'inputmin': {
                            'name': 'sizemin',
                            'value': 1
                        },
                        'inputmax': {
                            'name': 'sizemax',
                            'value': 1
                        }
                    },
                    {
                        'type': 'add',
                        'label': 'Alpha',
                        'attr': {
                            'min': 1,
                            'max': 10
                        },
                        'inputmin': {
                            'name': 'alphamin',
                            'value': 9
                        },
                        'inputmax': {
                            'name': 'alphamax',
                            'value': 10
                        }
                    },
                    {
                        'type': 'add',
                        'label': 'Speed',
                        'attr': {
                            'min': 1,
                            'max': 10
                        },
                        'inputmin': {
                            'name': 'speedmin',
                            'value': 1
                        },
                        'inputmax': {
                            'name': 'speedmax',
                            'value': 1
                        }
                    },
                    {
                        'type': 'add',
                        'label': 'Grow',
                        'attr': {
                            'min': 1,
                            'max': 10
                        },
                        'inputmin': {
                            'name': 'growmin',
                            'value': 0
                        },
                        'inputmax': {
                            'name': 'growmax',
                            'value': 0
                        }
                    }
                ],
                'range': [
                    {
                        'type': 'add',
                        'name': 'gravity',
                        'label': 'Gravity',
                        'attr': {
                            'min': -100,
                            'max': 100,
                            'value': 0,
                            'data-highlight': false
                        }
                    },
                    {
                        'type': 'add',
                        'name': 'fade',
                        'label': 'Fade',
                        'attr': {
                            'min': 0,
                            'max': 100,
                            'value': 10,
                            'data-highlight': true
                        }
                    },
                    {
                        'type': 'add',
                        'name': 'scatterx',
                        'label': 'Scatter X',
                        'attr': {
                            'min': 0,
                            'max': 320,
                            'value': 0,
                            'data-highlight': true
                        }
                    },
                    {
                        'type': 'add',
                        'name': 'scattery',
                        'label': 'Scatter Y',
                        'attr': {
                            'min': 0,
                            'max': 320,
                            'value': 0,
                            'data-highlight': true
                        }
                    },
                    {
                        'type': 'add',
                        'name': 'colorr',
                        'label': 'R',
                        'attr': {
                            'min': 0,
                            'max': 255,
                            'value': 255,
                            'data-highlight': true
                        }
                    },
                    {
                        'type': 'add',
                        'name': 'colorg',
                        'label': 'G',
                        'attr': {
                            'min': 0,
                            'max': 255,
                            'value': 255,
                            'data-highlight': true
                        }
                    },
                    {
                        'type': 'add',
                        'name': 'colorb',
                        'label': 'B',
                        'attr': {
                            'min': 0,
                            'max': 255,
                            'value': 255,
                            'data-highlight': true
                        }
                    },
                    {
                        'type': 'add',
                        'name': 'colorvariant',
                        'label': 'Color Variant',
                        'attr': {
                            'min': 1,
                            'max': 100,
                            'value': 1,
                            'data-highlight': true
                        }
                    }
                ]
            }
        }
    });

    return CavasModel;
});
