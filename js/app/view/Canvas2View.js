define([
    'jquery',
    'backbone',
    'jquerymobile',
    'handlebars',
    'app/util/util'
],
function($, Backbone, Mobile, util){

    var Canvas2View = Backbone.View.extend({

        el:'#canvas-view',

        template: Handlebars.compile( $('#canvas-view-template').html() ),

        initialize: function(){
            console.log('initialize Canvas2View.js');

            var self = this;

            self.render();

        },

        render: function(){
            console.log('render Canvas2View.js');

            var self = this;

            var markup = self.template();

            self.$el.html(markup);

            $(document).ready(function() {
                // if (!canvasSupport())
                    // return;

                    self.showParticles();
            });

            // self.$el.trigger('create');

            // self.$el.button('refresh'); // this causes multiple route events... misfiring collapsableset?

            return self;
        },

        showParticles: function(){

                var
                $canvas = document.getElementById('canvas'),
                $c = $canvas.getContext('2d'),
                $particles = [],
                $gravity = 0.00,
                $fade = 0.02,
                $sizeMin = 2,
                $sizeMax = 3,
                $growMin = 0.00,
                $growMax = 0.00,
                $speedMin = 1,
                $speedMax = 1,
                $scatterX = -0,
                $scatterY = 0,
                $alphaMin = 0.5,
                $alphaMax = 0.9,
                $colors = [],
                $colorVariation = 1,
                $color = 'c',
                $bgcolor = 'white';

                function init(){
                    // click to stop
                    $($canvas).click(function(e) {
                        //window.location = canvas.toDataURL('image/png');
                        //window.open(canvas.toDataURL('image/png'),'_blank');
                        clearInterval($loop);
                    });
                    // fill colors array
                    fillColors();
                    // start loop
                    return setInterval(loop,33);
                }

                function loop(){
                    renderBackground();
                    renderParticles();
                }

                // render particles
                function renderParticles(){
                    var $p = emitParticle();
                    $particles.push($p);
                    // iterate particles
                    for(var i=0; i<$particles.length; i++) {
                        // particle
                        $p = $particles[i];
                        // move
                        $p.x += $p.xvel;
                        $p.y += $p.yvel += $gravity*2;
                        // fade
                        $p.alpha -= $fade/2;
                        // grow
                        $p.size += $p.grow;
                        // render
                        $c.fillStyle = 'rgba('+$p.rgb+','+$p.alpha+')';
                        $c.beginPath();
                        // arc(x, y, radius, startAngle, endAngle, counterClockwise);
                        $c.arc($p.x,$p.y,$p.size,0,Math.PI*2,true);
                        $c.closePath();
                        $c.fill();
                        if ($p.alpha <= 0) {
                            $particles.splice(i,1);
                            i--;
                        }
                    }
                }

                // emit particle
                function emitParticle(){
                    var
                    $size = Math.floor(Math.random()*$sizeMax)+$sizeMin,
                    $speed = (Math.floor(Math.random()*$speedMax)+$speedMin),
                    $angle = Math.floor(Math.random()*360),
                    $radians = $angle*Math.PI/180,
                    $xpos =  $canvas.width/2-$size/2+randRange(-$scatterX,$scatterX),
                    $ypos = $canvas.height/2-$size/2+randRange(-$scatterY,$scatterY),
                    $xvel = Math.cos($radians)*$speed,
                    $yvel = Math.sin($radians)*$speed,
                    $rgb = colorVariation($colors[$color]),
                    $alpha = randRange($alphaMin,$alphaMax),
                    $grow = randRange($growMin,$growMax);

                    // particle object
                    return {
                        x:$xpos,
                        y:$ypos,
                        xvel:$xvel,
                        yvel:$yvel,
                        size:$size,
                        grow:$grow,
                        speed:$speed,
                        angle:$angle,
                        rgb:$rgb,
                        alpha:$alpha
                    };
                }

                // render background
                function renderBackground(){
                    $c.fillStyle = 'rgb('+$colors[$bgcolor]+')';
                    $c.fillRect(0,0,$canvas.width,$canvas.height);
                }

                // fill color pallet
                function fillColors(){
                    $colors['c']='0,174,239';
                    $colors['m']='236,0,140';
                    $colors['y']='255,242,0';
                    $colors['k']='0,0,0';
                    $colors['white']='255,255,255';
                    $colors['red']='255,0,0';
                    $colors['green']='0,255,0';
                    $colors['blue']='0,0,255';
                }

                // slight color variation
                function colorVariation($color){
                    var
                    $rgb_array = $color.split(','),
                    $r = Math.floor(randRange($rgb_array[0]/$colorVariation,$rgb_array[0])),
                    $g = Math.floor(randRange($rgb_array[1]/$colorVariation,$rgb_array[1])),
                    $b = Math.floor(randRange($rgb_array[2]/$colorVariation,$rgb_array[2]));
                    return $r+','+$g+','+$b;
                }

                // run
                var $loop = init();
        },
    });

    return Canvas2View;
});
