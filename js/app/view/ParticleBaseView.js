define([
    'jquery',
    'backbone',
    'jquerymobile',
    'app/model/CanvasModel',
    'handlebars'
],
function($, Backbone, Mobile, CanvasModel){

    var ParticleBaseView = Backbone.View.extend({

        el:'#canvas-view',

        template: Handlebars.compile( $('#canvas-view-template').html() ),

        initialize: function(){

            // console.log('initialize ParticleBaseView.js');

            var self = this;

            self.render();

        },

        render: function(){

            // console.log('render ParticleBaseView.js');

            var self = this;

            var type = self.model.get('type');

            // console.log( self.model );

            var markup = self.template();

            self.$el.html(markup);

            $('#btn-start-'+type).addClass('ui-disabled');

            $('#btn-stop-'+type).removeClass('ui-disabled');

            // jquery mobile paint all elements within $el
            self.$el.trigger('create');

            self.initParticles();

            return self;
        },

        initParticles: function(options){

            var self = this;

            var type = self.model.get('type');

            // if (!canvasSupport())
                // return;

            var
                canvas       = document.getElementById('canvas'),
                c            = canvas.getContext('2d'), // console.log(c);
                loopInterval = null,
                particles    = [],
                colors       = [],
                isRandom     = $('#inp-random-'+type).prop('checked'),
                gravity      = $('#inp-gravity-'+type).val(),
                fade         = $('#inp-fade-'+type).val(),
                sizeMin      = $('#inp-sizemin-'+type).val(),
                sizeMax      = $('#inp-sizemax-'+type).val(),
                growMin      = $('#inp-growmin-'+type).val(),
                growMax      = $('#inp-growmax-'+type).val(),
                speedMin     = $('#inp-speedmin-'+type).val(),
                speedMax     = $('#inp-speedmax-'+type).val(),
                scatterX     = $('#inp-scatterx-'+type).val(),
                scatterY     = $('#inp-scattery-'+type).val(),
                alphaMin     = $('#inp-alphamin-'+type).val(),
                alphaMax     = $('#inp-alphamax-'+type).val(),
                colorR       = $('#inp-colorr-'+type).val(),
                colorG       = $('#inp-colorg-'+type).val(),
                colorB       = $('#inp-colorb-'+type).val(),
                colorVariant = $('#inp-colorvariant-'+type).val(),
                bgcolor      = $('#inp-bgcolor-'+type).val()
            ;

            // confs key'd by "name" from collection
            var conf = {
                'type'         : type,
                'random'       : isRandom,
                'gravity'      : gravity,
                'fade'         : fade,
                'sizemin'      : sizeMin,
                'sizemax'      : sizeMax,
                'alphamin'     : alphaMin,
                'alphamax'     : alphaMax,
                'speedmin'     : speedMin,
                'speedmax'     : speedMax,
                'growmin'      : growMin,
                'growmax'      : growMax,
                'scatterx'     : scatterX,
                'scattery'     : scatterY,
                'colorr'       : colorR,
                'colorg'       : colorG,
                'colorb'       : colorB,
                'colorvariant' : colorVariant,
                'bgcolor'      : bgcolor
            };

            // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

            // set canvas width and height
            $(canvas).attr('width', $('#canvas-view').width());
            $(canvas).attr('height', $('#canvas-view').height());

            // interface events
            $('#btn-export-'+type).click(function(e){
                e.preventDefault();

                var model = new CanvasModel();

                // @todo: function to parse form data and create
                //        the json for the fields table.
                var json = self.makeJSON(conf);

                console.log(json);

                model.set('action', 'update');
                model.set('type', type);
                model.set('field', json);

                model.save(model.attributes,
                {
                    success: function(model, response, options){
                        console.log('Model saved');
                    },
                    error: function(model, xhr, options){
                        console.log(model);
                        console.log(xhr);
                        console.log(options);
                    }
                });
            });

            $('#btn-stop-'+type).click(function(e) {
                e.preventDefault();
                $(this).addClass('ui-disabled');
                $('#btn-start-'+type).removeClass('ui-disabled');
                clearInterval(loopInterval);
            });

            $('#btn-start-'+type).click(function(e) {
                e.preventDefault();
                $(this).addClass('ui-disabled');
                $('#btn-stop-'+type).removeClass('ui-disabled');
                loopInterval = init();
            });

            var json = self.model.toJSON();

             // select list
             _.filter( json.fields.select, function(o){
                $('#inp-'+o.name+'-'+o.type).change(function(e){
                    e.preventDefault();
                    var inp = $(this).val();
                    conf[o.name] = inp;
                });
            });

             // controlgroup
             _.filter( json.fields.controlgroup, function(o){
                $('#inp-'+o.name+'-'+o.type).change(function(e){
                    e.preventDefault();
                    var inp = $(this).prop('checked');
                    conf[o.name] = inp;
                });
            });

            // range
            _.filter( json.fields.range, function(o){
                $('#inp-'+o.name+'-'+o.type).change(function(e){
                    e.preventDefault();
                    var inp = $(this).val();
                    conf[o.name] = inp;
                });
            });

            // rangeslider
            _.filter( json.fields.rangeslider, function(o){
                $('#inp-'+o.inputmin.name+'-'+o.type).change(function(e){
                    e.preventDefault();
                    var inp = $(this).val();
                    conf[o.inputmin.name] = inp;
                });
                $('#inp-'+o.inputmax.name+'-'+o.type).change(function(e){
                    e.preventDefault();
                    var inp = $(this).val();
                    conf[o.inputmax.name] = inp;
                });
            });

            function init(){
                fillColors();
                return setInterval(loop, 33);
            }

            function loop(){
                renderBackground();
                renderParticles();
            }

            // render particles
            function renderParticles(){

                var p = particleObject();

                particles.push(p);

                // iterate particles
                for(var i=0; i < particles.length; i++) {

                    // particle
                    p = particles[i];

                    // move
                    p.x += p.xvel;
                    p.y += p.yvel += (conf['gravity']/100)*2;

                    // fade
                    p.alpha -= conf['fade']*0.0004;

                    // grow
                    p.size += p.grow*0.1;

                    // render
                    c.fillStyle = 'rgba(' + p.rgb + ',' + p.alpha + ')';
                    c.beginPath();

                    // arc(x, y, radius, startAngle, endAngle, counterClockwise);
                    c.arc( p.x, p.y, p.size, 0, Math.PI*2, true);
                    c.closePath();
                    c.fill();

                    if (p.alpha <= 0) {
                        particles.splice(i,1);
                        i--;
                    }
                }
            }

            function particleObject(){

                var
                    size    = (conf['random']) ? randRange(conf['sizemax']*1, conf['sizemin']*1)
                                               : conf['sizemax']*1,

                    speed   = (conf['random']) ? randRange(conf['speedmax']*1, conf['speedmin']*1)
                                               : conf['speedmax'],

                    alpha   = (conf['random']) ? randRange(conf['alphamax']*0.1, conf['alphamin']*0.1)
                                               : conf['alphamax']*0.1,

                    grow    = (conf['random']) ? randRange(conf['growmax']*0.1, conf['growmin']*0.1)
                                               : conf['growmax']*0.1,

                    angle   = Math.floor( Math.random() * 360 ),
                    radians = angle * Math.PI / 180,
                    xpos    = canvas.width / 2 - size / 2 + randRange( -conf['scatterx'], conf['scatterx'] ),
                    ypos    = canvas.height / 2 - size / 2 + randRange( -conf['scattery'], conf['scattery'] ),
                    xvel    = Math.cos( radians ) * speed,
                    yvel    = Math.sin( radians ) * speed,
                    rgb     = colorVariation( conf['colorr'] + ',' + conf['colorg'] + ',' + conf['colorb'] )
                ;

                return {
                    x:     xpos,
                    y:     ypos,
                    xvel:  xvel,
                    yvel:  yvel,
                    size:  size,
                    grow:  grow,
                    speed: speed,
                    angle: angle,
                    rgb:   rgb,
                    alpha: alpha
                };
            }

            function renderBackground(){
                c.fillStyle = 'rgb('+colors[conf['bgcolor']]+')';
                c.fillRect(0,0,canvas.width,canvas.height);
            }

            function fillColors(){
                colors['c']     = '0,174,239';
                colors['m']     = '236,0,140';
                colors['y']     = '255,242,0';
                colors['k']     = '0,0,0';
                colors['white'] = '255,255,255';
                colors['red']   = '255,0,0';
                colors['green'] = '0,255,0';
                colors['blue']  = '0,0,255';
            }

            function colorVariation(color){
                var
                    rgb_array = color.split(','),
                    r = Math.floor( randRange( rgb_array[0] / conf['colorvariant'], rgb_array[0] ) ),
                    g = Math.floor( randRange( rgb_array[1] / conf['colorvariant'], rgb_array[1] ) ),
                    b = Math.floor( randRange( rgb_array[2] / conf['colorvariant'], rgb_array[2] ) )
                ;
                return r + ',' + g + ',' + b;
            }

            function randRange(min, max) {
              return Math.random() * (max - min) + min;
            }

            // run
            var loopInterval = init();

            // stop all other loops (not a good solution.. but working)
            // http://stackoverflow.com/questions/3141064/how-to-stop-all-timeouts-and-intervals-using-javascript
            for (var i = 0 ; i < loopInterval; i++) {
                clearTimeout(i);
            }
        },

        makeJSON: function(conf){

            return {
                'canvas': '1',
                'type': conf['type'],
                'fields': {
                    'select': [
                        {
                            'type': conf['type'],
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
                            'type': conf['type'],
                            'name': 'random',
                            'label': 'Random',
                            'checked': '',
                            'value': 1
                        }
                    ],
                    'rangeslider': [
                        {
                            'type': conf['type'],
                            'label': 'Size',
                            'attr': {
                                'min': 1,
                                'max': 10
                            },
                            'inputmin': {
                                'name': 'sizemin',
                                'value': conf['sizemin']
                            },
                            'inputmax': {
                                'name': 'sizemax',
                                'value': conf['sizemax']
                            }
                        },
                        {
                            'type': conf['type'],
                            'label': 'Alpha',
                            'attr': {
                                'min': 1,
                                'max': 10
                            },
                            'inputmin': {
                                'name': 'alphamin',
                                'value': conf['alphamin']
                            },
                            'inputmax': {
                                'name': 'alphamax',
                                'value': conf['alphamax']
                            }
                        },
                        {
                            'type': conf['type'],
                            'label': 'Speed',
                            'attr': {
                                'min': 1,
                                'max': 10
                            },
                            'inputmin': {
                                'name': 'speedmin',
                                'value': conf['speedmin']
                            },
                            'inputmax': {
                                'name': 'speedmax',
                                'value': conf['speedmax']
                            }
                        },
                        {
                            'type': conf['type'],
                            'label': 'Grow',
                            'attr': {
                                'min': 1,
                                'max': 10
                            },
                            'inputmin': {
                                'name': 'growmin',
                                'value': conf['growmin']
                            },
                            'inputmax': {
                                'name': 'growmax',
                                'value': conf['growmax']
                            }
                        }
                    ],
                    'range': [
                        {
                            'type': conf['type'],
                            'name': 'gravity',
                            'label': 'Gravity',
                            'attr': {
                                'min': -100,
                                'max': 100,
                                'value': conf['gravity'],
                                'data-highlight': false
                            }
                        },
                        {
                            'type': conf['type'],
                            'name': 'fade',
                            'label': 'Fade',
                            'attr': {
                                'min': 0,
                                'max': 100,
                                'value': conf['fade'],
                                'data-highlight': true
                            }
                        },
                        {
                            'type': conf['type'],
                            'name': 'scatterx',
                            'label': 'Scatter X',
                            'attr': {
                                'min': 0,
                                'max': 320,
                                'value': conf['scatterx'],
                                'data-highlight': true
                            }
                        },
                        {
                            'type': conf['type'],
                            'name': 'scattery',
                            'label': 'Scatter Y',
                            'attr': {
                                'min': 0,
                                'max': 320,
                                'value': conf['scattery'],
                                'data-highlight': true
                            }
                        },
                        {
                            'type': conf['type'],
                            'name': 'colorr',
                            'label': 'R',
                            'attr': {
                                'min': 0,
                                'max': 255,
                                'value': conf['colorr'],
                                'data-highlight': true
                            }
                        },
                        {
                            'type': conf['type'],
                            'name': 'colorg',
                            'label': 'G',
                            'attr': {
                                'min': 0,
                                'max': 255,
                                'value': conf['colorg'],
                                'data-highlight': true
                            }
                        },
                        {
                            'type': conf['type'],
                            'name': 'colorb',
                            'label': 'B',
                            'attr': {
                                'min': 0,
                                'max': 255,
                                'value': conf['colorb'],
                                'data-highlight': true
                            }
                        },
                        {
                            'type': conf['type'],
                            'name': 'colorvariant',
                            'label': 'Color Variant',
                            'attr': {
                                'min': 1,
                                'max': 100,
                                'value': conf['colorvariant'],
                                'data-highlight': true
                            }
                        }
                    ]
                }
            }
        }
    });

    return ParticleBaseView;
});
