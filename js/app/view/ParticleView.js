define([
    'jquery',
    'backbone',
    'jquerymobile',
    'app/collection/ParticleCollection',
    'app/model/ParticleModel',
    'app/view/ParticleListView',
    'handlebars'
],
function($, Backbone, Mobile, ParticleCollection, ParticleModel, ParticleListView){

    var ParticleView = Backbone.View.extend({

        el:'#particle-view',

        template: Handlebars.compile( $('#particle-view-template').html() ),

        initialize: function(){

            // http://stackoverflow.com/questions/15206980/this-model-not-working-on-clicked-view-backbone-js

            // console.log('initialize ParticleView.js');

            var self = this;

            self.listenTo(self.model, 'add', self.render);

        },

        render: function(){

            // console.log('render ParticleView.js');

            var self = this;

            var id = self.model.get('id');

            // console.log(id);

            var markup = self.template();

            self.$el.html(markup);

            // jquery mobile paint all elements within $el
            self.$el.trigger('create');

            self.initParticles();

            return self;
        },

        initParticles: function(options){

            var self = this;

            var id = self.model.get('id');

            var name = self.model.get('name');

            // if (!canvasSupport())
                // return;

            var
                canvas       = document.getElementById('canvas'),
                c            = canvas.getContext('2d'), // console.log(c);
                loopInterval = null,
                particles    = [],
                colors       = [],
                isRandom     = $('#particle-form-'+id+' .inp-random').prop('checked'),
                colorVariant = $('#particle-form-'+id+' .inp-colorvariant').prop('checked'),
                gravity      = $('#particle-form-'+id+' .inp-gravity').val(),
                fade         = $('#particle-form-'+id+' .inp-fade').val(),
                sizeMin      = $('#particle-form-'+id+' .inp-sizemin').val(),
                sizeMax      = $('#particle-form-'+id+' .inp-sizemax').val(),
                growMin      = $('#particle-form-'+id+' .inp-growmin').val(),
                growMax      = $('#particle-form-'+id+' .inp-growmax').val(),
                speedMin     = $('#particle-form-'+id+' .inp-speedmin').val(),
                speedMax     = $('#particle-form-'+id+' .inp-speedmax').val(),
                scatterX     = $('#particle-form-'+id+' .inp-scatterx').val(),
                scatterY     = $('#particle-form-'+id+' .inp-scattery').val(),
                alphaMin     = $('#particle-form-'+id+' .inp-alphamin').val(),
                alphaMax     = $('#particle-form-'+id+' .inp-alphamax').val(),
                colorR       = $('#particle-form-'+id+' .inp-colorr').val(),
                colorG       = $('#particle-form-'+id+' .inp-colorg').val(),
                colorB       = $('#particle-form-'+id+' .inp-colorb').val(),
                bgcolor      = $('#particle-form-'+id+' .inp-bgcolor option[selected="selected"]').val()
            ;

            var conf = {
                'random'       : isRandom,
                'colorvariant' : colorVariant,
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
                'bgcolor'      : bgcolor
            };

            // set canvas width and height
            // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
            $(canvas).attr('width', $('#particle-view').width());
            $(canvas).attr('height', $('#particle-view').height());

            // interface events
            $('#particle-form-'+id+' .btn-stop').click(function(e) {
                e.preventDefault();
                $(this).addClass('ui-disabled');
                $('#particle-form-'+id+' .btn-start').removeClass('ui-disabled').prop('disabled', false);
                clearInterval(loopInterval);
            })
            .removeClass('ui-disabled')
            .prop('disabled', false);

            $('#particle-form-'+id+' .btn-start').click(function(e) {
                e.preventDefault();
                $(this).addClass('ui-disabled');
                $('#particle-form-'+id+' .btn-stop').removeClass('ui-disabled').prop('disabled', false);
                loopInterval = init();
            })
            .addClass('ui-disabled')
            .prop('disabled', 'disabled');

            $('#particle-form-'+id+' .btn-export').on({
                click: function(e){
                    e.preventDefault();

                    // $(this).addClass('ui-disabled');

                    if ( id == '0' ){

                        // insert
                        self.popupInputName(conf);

                    }
                    else {

                        // update
                        var json = self.fieldSchema(conf);
                        self.saveParticle('update', id, name, json);

                    }
                }
            });

            $('#particle-form-'+id+' .btn-delete').click(function(e) {
                e.preventDefault();

                // $(this).addClass('ui-disabled');

                // clearInterval(loopInterval);

                // delete
                self.popupDialogConfirm();

            });

            // canvas form evetns
            var json = self.model.toJSON();

            // console.log(json);

            // select list
            _.each( json.field.select, function(o){
                $('#particle-form-'+id+' .inp-'+o.name).change(function(e){
                    e.preventDefault();
                    var inp = $(this).val();
                    conf[o.name] = inp;
                });
            });

             // controlgroup
             _.each( json.field.controlgroup, function(o){
                $('#particle-form-'+id+' .inp-'+o.name).change(function(e){
                    e.preventDefault();
                    var inp = $(this).prop('checked');
                    conf[o.name] = inp;
                });
            });

            // range
            _.each( json.field.range, function(o){
                $('#particle-form-'+id+' .inp-'+o.name).change(function(e){
                    e.preventDefault();
                    var inp = $(this).val();
                    conf[o.name] = inp;
                });
            });

            // rangeslider
            _.each( json.field.rangeslider, function(o){
                $('#particle-form-'+id+' .inp-'+o.inputmin.name).change(function(e){
                    e.preventDefault();
                    var inp = $(this).val();
                    conf[o.inputmin.name] = inp;
                });
                $('#particle-form-'+id+' .inp-'+o.inputmax.name).change(function(e){
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

                toggle = (conf['colorvariant']) ? 2 : 1;

                var
                    rgb_array = color.split(','),
                    r = Math.floor( randRange( rgb_array[0] / toggle, rgb_array[0] ) ),
                    g = Math.floor( randRange( rgb_array[1] / toggle, rgb_array[1] ) ),
                    b = Math.floor( randRange( rgb_array[2] / toggle, rgb_array[2] ) )
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

        popupInputName: function(conf){

            var self = this;

            // always 0
            var id = self.model.attributes.id;

            // console.log(id);

            var $input = $('#popup-form-name form input');

            var $popup = $('#popup-form-name').popup({
                afteropen: function( event, ui ) {
                    $input.focus();
                },
                afterclose: function( event, ui ) {
                    $input.val('');
                },
            });

            // insert, append and expand new particle form
            $('#popup-form-name form').one({
                submit: function(e){
                    e.preventDefault();

                    var name = $input.val();

                    var json = self.fieldSchema(conf);

                    self.saveParticle('insert', id, name, json);

                    $popup.popup('close');

                }
            });

            $popup.popup('open');
        },

        popupDialogConfirm: function(){

            var self = this;

            var id = self.model.attributes.id;

            var $popup = $('#popup-dialog-confirm').popup({
                afteropen: function( event, ui ) {
                    // $input.focus();
                },
                afterclose: function( event, ui ) {
                    // $input.val('');
                },
            });

            $('#popup-dialog-confirm .btn-confirm-yes').one({
                click: function(e){
                    e.preventDefault();

                    self.model.destroy({
                        success: function(model, response) {
                            // @todo: clear out canvas
                            Backbone.history.navigate('', true);
                        },
                        error: function(model, response){
                            console.log(model);
                            console.log(response);
                        }
                    });

                    $popup.popup('close');

                }
            });

            $popup.popup('open');
        },
        saveParticle: function(action, id, name, json){

            var self = this;

            var item = new ParticleModel();

            item.set('action', action);
            item.set('id', id);
            item.set('name', name);
            item.set('field', json);

            item.save(item.attributes,
            {
                success: function(model, response, options){

                    if (action === 'insert'){
                        $('#particle-listview div:first-child').remove();
                        Backbone.history.navigate('', true);
                    }
                    else {
                        // blink me
                    }
                },
                error: function(model, xhr, options){
                    console.log(model);
                    console.log(xhr);
                    console.log(options);
                }
            });
        },

        fieldSchema: function(conf){

            return {
                'select': [
                    {
                        'name': 'bgcolor',
                        'label': 'Background',
                        'options': [
                            {
                                'label': 'Black',
                                'value': 'k',
                                'selected': conf['bgcolor'] === 'k' ? 'selected=selected' : ''
                            },
                            {
                                'label': 'White',
                                'value': 'white',
                                'selected': conf['bgcolor'] === 'white' ? 'selected=selected' : ''
                            },
                            {
                                'label': 'Cyan',
                                'value': 'c',
                                'selected': conf['bgcolor'] === 'c' ? 'selected=selected' : ''
                            },
                            {
                                'label': 'Magenta',
                                'value': 'm',
                                'selected': conf['bgcolor'] === 'm' ? 'selected=selected' : ''
                            },
                            {
                                'label': 'Yellow',
                                'value': 'y',
                                'selected': conf['bgcolor'] === 'y' ? 'selected=selected' : ''
                            },
                            {
                                'label': 'Red',
                                'value': 'red',
                                'selected': conf['bgcolor'] === 'red' ? 'selected=selected' : ''
                            },
                            {
                                'label': 'Green',
                                'value': 'green',
                                'selected': conf['bgcolor'] === 'green' ? 'selected=selected' : ''
                            },
                            {
                                'label': 'Blue',
                                'value': 'blue',
                                'selected': conf['bgcolor'] === 'blue' ? 'selected=selected' : ''
                            }
                        ]
                    }
                ],
                'controlgroup': [
                    {
                        'name': 'random',
                        'label': 'Random',
                        'checked': conf['random'] ? 'checked=checked' : '',
                        'value': 1
                    },
                    {
                        'name': 'colorvariant',
                        'label': 'Color Variant',
                        'checked': conf['colorvariant'] ? 'checked=checked' : '',
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
                            'value': conf['sizemin']
                        },
                        'inputmax': {
                            'name': 'sizemax',
                            'value': conf['sizemax']
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
                            'value': conf['alphamin']
                        },
                        'inputmax': {
                            'name': 'alphamax',
                            'value': conf['alphamax']
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
                            'value': conf['speedmin']
                        },
                        'inputmax': {
                            'name': 'speedmax',
                            'value': conf['speedmax']
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
                        'name': 'colorb',
                        'label': 'B',
                        'attr': {
                            'min': 0,
                            'max': 255,
                            'value': conf['colorb'],
                            'data-highlight': true
                        }
                    }
                ]
            }
        }
    });

    return ParticleView;
});
