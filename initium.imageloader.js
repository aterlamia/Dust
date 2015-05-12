var Initium = Initium || {};

(function ($) {

    Initium.Image = {
        planets: new Image(),
        load: function () {
            Initium.Image.planets.src = 'planets.png';
        }
    }
})(jQuery);
