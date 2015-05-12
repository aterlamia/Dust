
var Initium = Initium || {};

(function ($) {

    Initium.Renderer = {
        draw: function (context, scene) {
            context.clearRect(0, 0, Initium.Main.canvas.width, Initium.Main.canvas.height);
            for (var objectIdx in scene) {
                var object = scene[objectIdx];
                object.render();
            }
        },

        drawCircle: function (context, x, y, radius, color) {
            if (typeof(color) === 'undefined') {
                color = 'ffaa22';
            }
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.fillStyle = '#' + color;
            context.fill();
        },

        drawOrbit: function (context, x, y, radius, color) {
            if (typeof(color) === 'undefined') {
                color = 'ffaa22';
            }
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.strokeStyle = 'green';
            context.stroke();
        }
    }
})(jQuery);
