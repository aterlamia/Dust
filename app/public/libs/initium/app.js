var ImageLoader = (function () {
    function ImageLoader() {
        this.planets = new Image();
    }
    ImageLoader.prototype.load = function () {
        this.planets.src = 'planets.png';
    };
    return ImageLoader;
}());
define("renderer", ["require", "exports"], function (require, exports) {
    "use strict";
    var Renderer = (function () {
        function Renderer(canvas) {
            this._canvas = canvas;
            this._context = canvas.getContext('2d');
        }
        Renderer.prototype.draw = function (scene) {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            for (var objectIdx in scene) {
                var object = scene[objectIdx];
                object.render();
            }
        };
        Renderer.prototype.drawCircle = function (x, y, radius, color) {
            if (typeof (color) === 'undefined') {
                color = 'ffaa22';
            }
            this._context.beginPath();
            this._context.arc(x, y, radius, 0, 2 * Math.PI);
            this._context.fillStyle = '#' + color;
            this._context.fill();
        };
        Renderer.prototype.drawOrbit = function (x, y, radius, color) {
            if (typeof (color) === 'undefined') {
                color = 'ffaa22';
            }
            this._context.beginPath();
            this._context.arc(x, y, radius, 0, 2 * Math.PI);
            this._context.strokeStyle = 'green';
            this._context.stroke();
        };
        return Renderer;
    }());
    exports.Renderer = Renderer;
});
define("initium", ["require", "exports"], function (require, exports) {
    "use strict";
    var Initium = (function () {
        function Initium(renderer) {
            this.counter = 1;
            this.fps = 60;
            this.context = null;
            this.loop = false;
            this.scene = [];
            this.renderer = renderer;
        }
        Initium.prototype.addToScene = function (item) {
            this.scene.push(item);
        };
        Initium.prototype.update = function () {
            $.each(this.scene, function (idx, object1) {
                object1.update();
            });
        };
        Initium.prototype.start = function () {
            var image = new ImageLoader();
            image.load();
            this.limitLoop(this.doStuff);
        };
        Initium.prototype.doStuff = function (game) {
            game.update();
            game.renderer.draw(game.getScene());
        };
        Initium.prototype.getScene = function () {
            return this.scene;
        };
        Initium.prototype.limitLoop = function (fn) {
            // Use let then = Date.now(); if you
            // don't care about targetting < IE9
            var then = new Date().getTime();
            var interval = 1001 / this.fps;
            var game = this;
            return (function loop() {
                requestAnimationFrame(loop);
                // again, Date.now() if it's available
                var now = new Date().getTime();
                var delta = now - then;
                if (delta > interval) {
                    // Update time
                    // now - (delta % interval) is an improvement over just
                    // using then = now, which can end up lowering overall fps
                    then = now - (delta % interval);
                    // call the fn
                    fn(game);
                }
            })();
        };
        return Initium;
    }());
    exports.__esModule = true;
    exports["default"] = Initium;
});
define("Objects/heavenlyBody", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("Objects/planet", ["require", "exports"], function (require, exports) {
    "use strict";
    var Planet = (function () {
        function Planet(renderer, x, y, mass, radius, distance, parent) {
            this._renderer = renderer;
            this._x = x;
            this._y = y;
            this._mass = mass;
            this._radius = radius;
            this._distance = distance;
            this._parent = parent;
        }
        Planet.prototype.getMass = function () {
            return this._mass;
        };
        Planet.prototype.getDistance = function () {
            return this._distance;
        };
        Planet.prototype.getLabel = function () {
            return this._label;
        };
        Planet.prototype.setVelocity = function (velocity) {
            this._velocity = velocity;
        };
        Planet.prototype.setColor = function (color) {
            this._color = color;
        };
        Planet.prototype.setLabel = function (label) {
            this._label = label;
        };
        Planet.prototype.setModifier = function (modifier) {
            this._modifier = modifier;
        };
        Planet.prototype.getVelocity = function () {
            return this._velocity;
        };
        Planet.prototype.setY = function (value) {
            this._y = value;
        };
        Planet.prototype.setX = function (value) {
            this._x = value;
        };
        Planet.prototype.getX = function () {
            return this._x;
        };
        Planet.prototype.getY = function () {
            return this._y;
        };
        Planet.prototype.getRadius = function () {
            return this._radius;
        };
        Planet.prototype.render = function () {
            this._renderer.drawCircle(this._y, this._x, this._radius, this._color);
            this._renderer.drawOrbit(this._parent.getY(), this._parent.getX(), this._distance, null);
        };
        return Planet;
    }());
    exports.Planet = Planet;
});
define("Utils/math", ["require", "exports"], function (require, exports) {
    "use strict";
    var InitiumMath = (function () {
        function InitiumMath() {
        }
        InitiumMath.getGravitationalConstant = function () {
            return this.gravitationalConstant;
        };
        InitiumMath.prototype.setGravitationalConstant = function (constant) {
        };
        InitiumMath.prototype.toDegrees = function (radians) {
            return 57.2957795 * radians;
        };
        InitiumMath.prototype.toRadians = function (degrees) {
            return degrees * 0.017453293;
        };
        InitiumMath.calcGravity = function (object1, object2) {
            // In the orbit we will almost always be at an angle.
            // To get this angle we will make a virtual triangle.
            var sideA = Math.abs(object1.getX() - object2.getX());
            var sideB = Math.abs(object1.getY() - object2.getY());
            // Calculate the real distance between the 2 sides (basically the hypotenuse of the triangle)
            var distance = this.calcDistance(sideA, sideB);
            // Now knowing the distance and the masses of the celestial bodies we can calculate the amount of
            // gravitational force they apply with the formula , Fgrav = (Gm1m2)/d^2;
            // (gravitationalConstant*mass of body1 * mass of body 2)/distance ^2)
            return this.gravitationalConstant * ((object1.getMass() * object2.getMass()) / Math.pow(distance, 2));
        };
        InitiumMath.prototype.randomIntFromInterval = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        ;
        InitiumMath.calcDistance = function (sideA, sideB) {
            // Pytagoras nuff said.
            return Math.sqrt((Math.pow(sideA, 2) + Math.pow(sideB, 2)));
        };
        ;
        InitiumMath.calcForce = function (gravity, object1, object2) {
            var main, satellite;
            //check which one is main body and  which on the satellite.
            if (object1.getMass() > object2.getMass()) {
                main = object1;
                satellite = object2;
            }
            else {
                main = object2;
                satellite = object1;
            }
            // Again use a triangle to calculate the angle between one object and the other.
            var angle = Math.atan2(main.getX() - satellite.getX(), main.getY() - satellite.getY());
            // Get the next plot of the planet.
            satellite.getVelocity().forceX = satellite.getVelocity().forceX + (Math.sin(angle) * gravity);
            satellite.getVelocity().forceY = satellite.getVelocity().forceY + (Math.cos(angle) * gravity);
            console.debug(satellite.getLabel() + ' gravity : ' + gravity);
            console.debug(satellite.getLabel() + ' : ' + satellite.getVelocity().forceX + ',' + satellite.getVelocity().forceY);
            console.debug(satellite.getLabel() + ' : ' + angle);
            return angle;
        };
        return InitiumMath;
    }());
    InitiumMath.gravitationalConstant = 6.674 * Math.pow(10, -11);
    InitiumMath.framesPerYear = 3153;
    exports.InitiumMath = InitiumMath;
});
define("Objects/star", ["require", "exports", "Objects/planet", "Utils/math"], function (require, exports, planet_1, math_1) {
    "use strict";
    var Star = (function () {
        function Star(x, y, mass, radius, maxPlanetaryInfluence, renderer) {
            this._x = x;
            this._y = y;
            this._mass = mass;
            this._radius = radius;
            this._maxPlanetaryInfluence = maxPlanetaryInfluence;
            this._renderer = renderer;
            this._orbitals = [];
        }
        Star.prototype.getVelocity = function () {
            return { forceX: 1, forceY: 1 };
        };
        Star.prototype.getMass = function () {
            return this._mass;
        };
        Star.prototype.getX = function () {
            return this._x;
        };
        Star.prototype.getY = function () {
            return this._y;
        };
        Star.prototype.addOrbital = function (distance, mass, radius, color, label, modifier) {
            modifier = modifier || 1;
            distance = distance / modifier;
            var planetX = this._x - distance;
            var planet = new planet_1.Planet(this._renderer, planetX, this._y, mass, radius, distance, this);
            // The time it would take for one complete orbit.
            var time = Math.sqrt((4 * Math.pow(Math.PI, 2) * (Math.pow((distance), 3))) / ((this._mass) * math_1.InitiumMath.getGravitationalConstant()));
            // let time = Math.sqrt((4 * Math.pow(Math.PI, 2) * (Math.pow((distance * modifier), 3))) / ((this._mass + mass) * InitiumMath.getGravitationalConstant()  ));
            // All planets start at the top so calculate the initial horizontal velocity.
            // Every step we need to make has to be the circumfence of the orbit divided by the time to move the planet the
            // correct amount of distance. This is just linear distance later we will make this circular.
            var v = (2 * Math.PI * (distance)) / time;
            // let v = (2 * Math.PI * (distance * modifier)) / time;
            planet.setVelocity({ forceX: 0, forceY: v });
            planet.setColor(color);
            planet.setLabel(label || 'unknown');
            planet.setModifier(modifier);
            console.debug('Add orbital: ' + planet.getLabel() + ' : ' + planet.getVelocity().forceX + ',' + planet.getVelocity().forceY);
            console.debug('Add oribital: ' + distance);
            console.debug('Add oribital: ' + time);
            this._orbitals.push(planet);
        };
        Star.prototype.update = function () {
            var self = this;
            $.each(this._orbitals, function (idx, orbital) {
                // The planet and the star will exersise gravity on eachother.
                var grav = math_1.InitiumMath.calcGravity(self, orbital);
                // Now we need to calculate the forces/velocities the planet has to
                // stay in orbit.
                math_1.InitiumMath.calcForce(grav, self, orbital);
                orbital.setX(orbital.getX() + orbital.getVelocity().forceX);
                orbital.setY(orbital.getY() + orbital.getVelocity().forceY);
            });
        };
        ;
        Star.prototype.render = function () {
            this._renderer.drawCircle(this._y, this._x, this._radius, 'FFFF00');
            $.each(this._orbitals, function (idx, orbital) {
                orbital.render();
            });
        };
        ;
        return Star;
    }());
    exports.Star = Star;
});
define("main", ["require", "exports", "initium", "renderer", "Objects/star"], function (require, exports, initium_1, renderer_1, star_1) {
    "use strict";
    var canvas = $('canvas').get(0);
    //
    // $('canvas').first().width(3200);
    // $('canvas').first().height(3200);
    canvas.width = 3500;
    canvas.height = 3500;
    var renderer = new renderer_1.Renderer(canvas);
    var game = new initium_1["default"](renderer);
    renderer.drawCircle(30, 30, 20, 'ffdd33');
    renderer.drawCircle(70, 30, 20, 'ddeeff');
    var sun = new star_1.Star(500, 500, 198900000000, 20, 500, renderer);
    // sun.addOrbital(57.91, 1, 5, 'ffddaa', 'mercury', 1);
    // sun.addOrbital(108.2, 1, 10, '34a8da', 'venus', 1);
    sun.addOrbital(149.5, 1, 10, '342332', 'earth', 1);
    sun.addOrbital(149.5, 1, 10, '342332', 'earth2.0', 2);
    // sun.addOrbital(227.9, 1, 7, '33hd23', 'mars', 1);
    // sun.addOrbital(778.5, 1, 13, '34ff32', 'jupiter', 3);
    // sun.addOrbital(778.5, 1, 13, '7766ee', 'jupiter', 1);
    game.addToScene(sun);
    game.start();
});
