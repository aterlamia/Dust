var DUST = DUST || {};

(function () {

    DUST.MAIN = {
        logEnabled: false,

        init: function (specs) {
            DUST.canvas.width = 4000;//window.innerWidth; //document.width is obsolete
            DUST.canvas.height = 4000;//window.innerHeight;; //document.height is obsolete

            DUST.CLOUD.specs = specs;
        },

        start: function () {
            //DUST.CLOUD.drawSpec(10,10)
        },

        update: function () {
            DUST.CLOUD.updateForces();
        },

        log: function (text) {
            if (DUST.MAIN.logEnabled) {
                console.debug(text);
            }
        },

        draw: function () {
            for (specIndex in DUST.CLOUD.specs) {
                var spec = DUST.CLOUD.specs[specIndex];
                DUST.CLOUD.drawSpec(spec.X, spec.Y, 'dd3d48');
            }
        }
    }
})();