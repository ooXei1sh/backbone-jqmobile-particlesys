define([
    'jquery',
    'backbone',
    'jquerymobile',
    'handlebars'
],
function($, Backbone, Mobile){

    var ParticleBaseView = Backbone.View.extend({

        el:'#canvas-view',

        template: Handlebars.compile( $('#canvas-view-template').html() ),

        initialize: function(options){
            // console.log('initialize CanvasView.js');

            var self = this;

            self.options = options;

            self.render();
        },

        render: function(){

            // console.log('render CanvasView.js');

            var self = this;

            var type = self.options.type;

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

            var
                self = this,
                type = self.options.type,
                collection = self.options.collection
            ;

            // if (!canvasSupport())
                // return;

            var
                canvas       = document.getElementById('canvas'),
                c            = canvas.getContext('2d'), // console.log(c);
                loopInterval = null,
                particles    = [],
                isRandom     = $('#inp-random-'+type).prop('checked'),
                gravity      = $('#inp-gravity-'+type).val(),
                fade         = $('#inp-fade-'+type).val(),
                sizeMin      = $('#inp-sizemin-'+type).val(),
                sizeMax      = $('#inp-sizemax-'+type).val(),
                growMin      = 0,
                growMax      = $('#inp-grow-'+type).val(),
                speedMin     = 1,
                speedMax     = $('#inp-speed-'+type).val(),
                scatterX     = $('#inp-scatterx-'+type).val(),
                scatterY     = $('#inp-scattery-'+type).val(),
                alphaMin     = $('#inp-alphamin-'+type).val(),
                alphaMax     = $('#inp-alphamax-'+type).val(),
                colors       = [],
                colorR       = $('#inp-colorr-'+type).val(),
                colorG       = $('#inp-colorg-'+type).val(),
                colorB       = $('#inp-colorb-'+type).val(),
                colorVariant = $('#inp-colorvariant-'+type).val(),
                bgcolor      = $('#inp-bgcolor-'+type).val()
            ;

            // confs key'd by "name" from collection
            var conf = {
                'random'       : isRandom,
                'gravity'      : gravity,
                'fade'         : fade,
                'sizemin'      : sizeMin,
                'sizemax'      : sizeMax,
                'alphamin'     : alphaMin,
                'alphamax'     : alphaMax,
                'grow'         : growMax,
                'speed'        : speedMax,
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
            $('#btn-stop-'+type).click(function(e) {
                $(this).addClass('ui-disabled');
                $('#btn-start-'+type).removeClass('ui-disabled');
                clearInterval(loopInterval);
            });

            $('#btn-start-'+type).click(function(e) {
                $(this).addClass('ui-disabled');
                $('#btn-stop-'+type).removeClass('ui-disabled');
                loopInterval = init();
            });

            // backbone collection methods are not working..
            // model is null, and pulling from function not server?
            // console.log(collection.at(0));

            var json = collection.collection[0];
            // console.log(json.fields);

             // select list
             _.filter( json.fields.select, function(o){
                $('#inp-'+o.name+'-'+o.type).change(function(e){

                    console.log(o.name);
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
                    size    = (conf['random']) ? Math.floor( Math.random() * (conf['sizemax']*0.5) ) + (conf['sizemin']*0.5)
                                                 : Math.floor( (conf['sizemax']*0.5) ) + (conf['sizemin']*0.5),

                    speed   = (conf['random']) ? Math.floor( Math.random() * conf['speed'] ) + speedMin
                                                 : Math.floor( conf['speed'] ) + speedMin,

                    alpha   = (conf['random']) ? Math.floor( Math.random() * (conf['alphamax']*0.1) ) + (conf['alphamin']*0.1)
                                                 : Math.floor( (conf['alphamax']*0.1) ) + (conf['alphamin']*0.1),

                    angle   = Math.floor( Math.random() * 360 ),
                    radians = angle * Math.PI / 180,
                    xpos    = canvas.width / 2 - size / 2 + randRange( -conf['scatterx'], conf['scatterx'] ),
                    ypos    = canvas.height / 2 - size / 2 + randRange( -conf['scattery'], conf['scattery'] ),
                    xvel    = Math.cos( radians ) * speed,
                    yvel    = Math.sin( radians ) * speed,
                    rgb     = colorVariation( conf['colorr'] + ',' + conf['colorg'] + ',' + conf['colorb'] ),
                    grow    = Math.floor( randRange( growMin, conf['grow'] ) );
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
        }
    });

    return ParticleBaseView;
});
