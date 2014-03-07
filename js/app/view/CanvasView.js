define([
    'jquery',
    'backbone',
    'jquerymobile',
    'handlebars'
],
function($, Backbone, Mobile){

    var CanvasView = Backbone.View.extend({

        el:'#canvas-view',

        template: Handlebars.compile( $('#canvas-view-template').html() ),

        initialize: function(){
            console.log('initialize CanvasView.js');

            var self = this;

            self.render();

        },

        render: function(){

            console.log('render CanvasView.js');

            var self = this;

            var markup = self.template();

            self.$el.html(markup);

            self.initParticles();

            return self;
        },

        initParticles: function(){
            // if (!canvasSupport())
                // return;

            var
            $canvas = document.getElementById('canvas'),
            $c = $canvas.getContext('2d'),
            $particles = [],
            $gravity = 0.1,
            $duration = 1000;
        },

        startParticleLoop: function(){
            // $($canvas).click(function(e) {
            //     window.location = canvas.toDataURL('image/png');
            // });

            // start loop
            return setInterval(loop,33);
        },

        particleLoop: function(){
            renderBackground();
            renderParticles();
        },

        renderParticles: function(){

            var $p = emitParticle();

            $particles.push($p);

            // iterate particles
            for(var i=0; i<$particles.length; i++) {
                // current particle
                $p = $particles[i];
                //move
                $p.x += $p.xvel;
                $p.y += $p.yvel += $gravity*2;
                // color
                $c.fillStyle = 'rgba('+$p.rgb+','+$p.alpha+')';
                $c.beginPath();
                // arc(x, y, radius, startAngle, endAngle, counterClockwise);
                $c.arc($p.x,$p.y,$p.size,0,Math.PI*2,true);
                $c.closePath();
                $c.fill();
                // does not work
                if ($p.alpha < 0) {
                    $particles.splice(i, 0);
                }
                // end loop
                if ($duration && $particles.length > $duration){
                    clearInterval($loop);
                }
            }
        },

        emitParticle: function(){
            var
            $size = Math.floor(Math.random()*3)+1,
            $speed = Math.floor(Math.random()*3)+1,
            $angle = Math.floor(Math.random()*360),
            $radians = $angle*Math.PI/180,
            $xpos = $canvas.width/2-$size/2,
            $ypos = $canvas.height/2-$size/2,
            $xvel = Math.cos($radians)*$speed,
            $yvel = Math.sin($radians)*$speed,
            $rgb = '0,0,0',
            $alpha = 1;

            // particle object
            return {
                x:$xpos,
                y:$ypos,
                xvel:$xvel,
                yvel:$yvel,
                size:$size,
                speed:$speed,
                angle:$angle,
                rgb:$rgb,
                alpha:$alpha
            };
        },

        renderBackground: function(){
            $c.fillStyle = 'rgb(255,255,255)';
            $c.fillRect(0,0,$canvas.width,$canvas.height);
        }
    });

    return CanvasView;
});
