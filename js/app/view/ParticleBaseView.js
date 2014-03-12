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

            var self = this;

            var type = self.options.type;

            // if (!canvasSupport())
                // return;

            var
            canvas       = document.getElementById('canvas'),
            c            = canvas.getContext('2d'), // console.log(c);
            loopInterval = null,
            particles    = [],
            gravity      = $('#inp-gravity-'+type).val()/100,
            fade         = ($('#inp-fade-'+type).val() >= 10) ? '0.10' : '0.0'+$('#inp-fade-'+type).val(),
            sizeMin      = 1,
            sizeMax      = $('#inp-size-'+type).val(),
            growMin      = 0.0,
            growMax      = ($('#inp-grow-'+type).val() >= 10) ? 1.0 : '0.'+$('#inp-grow-'+type).val(),
            speedMin     = 1,
            speedMax     = $('#inp-speed-'+type).val(),
            scatterX     = $('#inp-scatterx-'+type).val(),
            scatterY     = $('#inp-scattery-'+type).val(),
            alphaMin     = 0.01,
            alphaMax     = ($('#inp-alpha-'+type).val() >= 10) ? 1.0 : '0.'+$('#inp-alpha-'+type).val(),
            colors       = [],
            colorVariant = $('#inp-colorvariant-'+type).val(),
            color        = $('#inp-color-'+type).val(),
            bgcolor      = $('#inp-bgcolor-'+type).val();

            // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

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

            $('#inp-color-'+type).change(function(){
                var inp = $(this).val();
                color = inp;
            });

            $('#inp-bgcolor-'+type).change(function(){
                var inp = $(this).val();
                bgcolor = inp;
            });

            $('#inp-gravity-'+type).change(function(){
                var inp = $(this).val()/100;
                gravity = inp;
            });

            $('#inp-colorvariant-'+type).change(function(){
                var inp = $(this).val();
                colorVariant = inp;
            });

            $('#inp-speed-'+type).change(function(){
                var inp = $(this).val();
                speedMax = inp;
            });

            $('#inp-size-'+type).change(function(){
                var inp = $(this).val();
                sizeMax = inp;
            });

            $('#inp-alpha-'+type).change(function(){
                var inp = $(this).val();
                alphaMax = (inp >= 10) ? '1.0' :'0.'+inp;
            });

            $('#inp-fade-'+type).change(function(){
                var inp = $(this).val();
                fade = (inp >= 10) ? '0.10' :'0.0'+inp;
            });

            $('#inp-scatterx-'+type).change(function(){
                var inp = $(this).val();
                scatterX = inp;
            });

            $('#inp-scattery-'+type).change(function(){
                var inp = $(this).val();
                scatterY = inp;
            });

            $('#inp-grow-'+type).change(function(){
                var inp = $(this).val();
                growMax = (inp >= 10) ? '1.0' : '0.'+inp;
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
                    p.y += p.yvel += gravity*2;

                    // fade
                    p.alpha -= fade;

                    // grow
                    p.size += p.grow;

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
                    size    = Math.floor( Math.random() * sizeMax ) + sizeMin,
                    speed   = Math.floor( Math.random() * speedMax ) + speedMin,
                    angle   = Math.floor( Math.random() * 360 ),
                    radians = angle * Math.PI / 180,
                    xpos    = canvas.width / 2 - size / 2 + randRange( -scatterX, scatterX ),
                    ypos    = canvas.height / 2 - size / 2 + randRange( -scatterY, scatterY ),
                    xvel    = Math.cos( radians ) * speed,
                    yvel    = Math.sin( radians ) * speed,
                    rgb     = colorVariation( colors[color] ),
                    alpha   = randRange( alphaMin, alphaMax ),
                    grow    = randRange( growMin, growMax )
                ;

                return {
                    x: xpos,
                    y: ypos,
                    xvel: xvel,
                    yvel: yvel,
                    size: size,
                    grow: grow,
                    speed: speed,
                    angle: angle,
                    rgb: rgb,
                    alpha: alpha
                };
            }

            function renderBackground(){
                c.fillStyle = 'rgb('+colors[bgcolor]+')';
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
                    r = Math.floor( randRange( rgb_array[0] / colorVariant, rgb_array[0] ) ),
                    g = Math.floor( randRange( rgb_array[1] / colorVariant, rgb_array[1] ) ),
                    b = Math.floor( randRange( rgb_array[2] / colorVariant, rgb_array[2] ) )
                ;
                return r + ',' + g + ',' + b;
            }

            function randRange(min, max) {
              return min+(Math.random()*(max-min));
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
