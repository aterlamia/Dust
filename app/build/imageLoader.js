'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageLoader = function () {
    function ImageLoader() {
        _classCallCheck(this, ImageLoader);

        this.planets = new Image();
    }

    _createClass(ImageLoader, [{
        key: 'load',
        value: function load() {
            this.planets.src = 'planets.png';
        }
    }]);

    return ImageLoader;
}();
//# sourceMappingURL=imageLoader.js.map
