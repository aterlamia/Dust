"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Initium = function () {
    function Initium(canvas) {
        _classCallCheck(this, Initium);

        this.fps = 60;
        this.canvas = canvas;
        this.context = null;
        this.loop = false;
        this.scene = [];
    }

    _createClass(Initium, [{
        key: "update",
        value: function update() {
            $.each(this.scene, function (idx, object1) {
                object1.update();
            });
        }
    }, {
        key: "start",
        value: function start() {
            var image = new ImageLoader();
            image.load();
            this.limitLoop(this.doStuff);
        }
    }, {
        key: "doStuff",
        value: function doStuff() {
            // console.debug('test')
        }
    }, {
        key: "limitLoop",
        value: function limitLoop(fn) {
            // Use let then = Date.now(); if you
            // don't care about targetting < IE9
            var then = new Date().getTime();
            // custom fps, otherwise fallback to 60
            var interval = 1000 / this.fps;
            return function loop() {
                requestAnimationFrame(loop);
                // again, Date.now() if it's available
                var now = new Date().getTime();
                var delta = now - then;
                if (delta > interval) {
                    // Update time
                    // now - (delta % interval) is an improvement over just
                    // using then = now, which can end up lowering overall fps
                    then = now - delta % interval;
                    // call the fn
                    fn();
                }
            }();
        }
    }]);

    return Initium;
}();

exports.default = Initium;
//# sourceMappingURL=initium.js.map
