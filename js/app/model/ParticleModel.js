define([
    'jquery',
    'backbone'
],
function($, Backbone ){

    var CavasModel = Backbone.Model.extend({

        urlRoot: '/backbone-jqmobile-particlesys/ajax/ParticleModel.php',

        initialize: function(){
        },

        defaults:
        {
            'id': '0',
            'name': 'add',
            'field': {
                'select': [
                    {
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
                        'name': 'random',
                        'label': 'Random',
                        'checked': '',
                        'value': 1
                    },
                    {
                        'name': 'colorvariant',
                        'label': 'Color Variant',
                        'checked': '',
                        'value': 1
                    }
                ],
                'rangeslider': [
                    {
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
                        'name': 'colorb',
                        'label': 'B',
                        'attr': {
                            'min': 0,
                            'max': 255,
                            'value': 255,
                            'data-highlight': true
                        }
                    }
                ]
            }
        }
    });

    return CavasModel;
});
