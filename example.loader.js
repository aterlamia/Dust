var EXAMPLE = EXAMPLE || {};

(function ($) {
    $(document).ready(function documentReady() {
        var example = $('canvas').first().attr('id');

        if (example === 'example1') {
            var ex = new Example1(jQuery);
            ex.init();
        }
    });
})(jQuery);


var Example1 = function ($) {
    this.init = function () {
        var canvas = $('canvas').first();
        Initium.Main.canvas = canvas[0];
        Initium.Main.context = canvas[0].getContext('2d');
        Initium.Main.canvas.width = 3200;//window.innerWidth; //document.width is obsolete
        Initium.Main.canvas.height = 3200;
        $(Initium.Main.canvas).css('background-color', 'black');
        // create earth.
        var sun = new Initium.Star(1500, 1500, 198900000000, 20, 500);

        sun.addOrbital(57.91, 1, 5, '234567', 'mercury');
        sun.addOrbital(108.2, 1, 10, '34a8da', 'venus');
        sun.addOrbital(149.5, 1, 10, '342332', 'earth');
        sun.addOrbital(227.9, 1, 7, '33hd23', 'mars');
        sun.addOrbital(778.5, 1, 13, '34ff32', 'jupiter', 3);
        sun.addOrbital(778.5, 1, 13, '7766ee', 'jupiter', 1);

        Initium.Main.scene.push(sun);
        Initium.start();
    };
};
