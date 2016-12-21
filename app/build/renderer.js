'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = exports.Renderer = function () {
    function Renderer() {
        _classCallCheck(this, Renderer);
    }
    //
    // public draw(context, scene) {
    //     context.clearRect(0, 0, Initium.Main.canvas.width, Initium.Main.canvas.height);
    //     for (var objectIdx in scene) {
    //         var object = scene[objectIdx];
    //         object.render();
    //     }
    // }


    _createClass(Renderer, [{
        key: 'drawCircle',
        value: function drawCircle(context, x, y, radius, color) {
            if (typeof color === 'undefined') {
                color = 'ffaa22';
            }
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.fillStyle = '#' + color;
            context.fill();
        }
    }, {
        key: 'drawOrbit',
        value: function drawOrbit(context, x, y, radius, color) {
            if (typeof color === 'undefined') {
                color = 'ffaa22';
            }
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.strokeStyle = 'green';
            context.stroke();
        }
    }]);

    return Renderer;
}();
//# sourceMappingURL=renderer.js.map
