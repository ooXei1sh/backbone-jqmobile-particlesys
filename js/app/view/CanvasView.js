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

            self.initParticles(self);

            return self;
        },

        initParticles: function(self){
            // if (!canvasSupport())
                // return;

            var
            p = p || {};
            // self.particles = {},
            // self.particles.canvas = document.getElementById('canvas'),
            // self.particles.c = canvas.getContext('2d'),
            // self.particles.particles = [],
            // self.particles.gravity = 0.1,
            // self.particles.duration = 1000;
            // self.particles.loop = self.startParticleLoop();
        },

        startParticleLoop: function(){
            // $(canvas).click(function(e) {
            //     window.location = canvas.toDataURL('image/png');
            // });

            // start loop
            // return setInterval(self.particleLoop, 33);
        },

        particleLoop: function(){
            // self.renderBackground();
            // self.renderParticles();
        },

        renderParticles: function(){

            // var
            // self = this,
            // self.particles.p = self.particle();

            // self.particles.particles.push(p);

            // // iterate particles
            // for(var i=0; i<self.particles.particles.length; i++) {
            //     // current particle
            //     self.particles.p = self.particles.particles[i];
            //     //move
            //     self.particles.p.x += self.particles.p.xvel;
            //     self.particles.p.y += self.particles.p.yvel += self.particles.gravity*2;
            //     // color
            //     self.particles.c.fillStyle = 'rgba('+self.particles.p.rgb+','+self.particles.p.alpha+')';
            //     self.particles.c.beginPath();
            //     // arc(x, y, radius, startAngle, endAngle, counterClockwise);
            //     self.particles.c.arc(self.particles.p.x, self.particles.p.y, self.particles.p.size, 0, Math.PI*2, true);
            //     self.particles.c.closePath();
            //     self.particles.c.fill();
            //     // does not work
            //     if (self.particles.p.alpha < 0) {
            //         self.particles.particles.splice(i, 0);
            //     }
            //     // end loop
            //     if (self.particles.duration && self.particles.particles.length > duration){
            //         clearInterval(self.particles.loop);
            //     }
            // }
        },

        particle: function(){
            var
            size = Math.floor(Math.random()*3)+1,
            speed = Math.floor(Math.random()*3)+1,
            angle = Math.floor(Math.random()*360),
            radians = angle*Math.PI/180,
            xpos = canvas.width/2-size/2,
            ypos = canvas.height/2-size/2,
            xvel = Math.cos(radians)*speed,
            yvel = Math.sin(radians)*speed,
            rgb = '0,0,0',
            alpha = 1;

            // particle object
            return {
                x: xpos,
                y: ypos,
                xvel: xvel,
                yvel: yvel,
                size: size,
                speed: speed,
                angle: angle,
                rgb: rgb,
                alpha: alpha
            };
        },

        renderBackground: function(){
            var self = this;
            self.particles.c.fillStyle = 'rgb(255,255,255)';
            self.particles.c.fillRect(0, 0, self.particles.canvas.width, self.particles.canvas.height);
        }
    });

    return CanvasView;
});
