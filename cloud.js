var DUST = DUST || {};

(function () {
    DUST.CLOUD = {
        specs: [],

        updateForces: function () {
            for (specIndex in DUST.CLOUD.specs) {
                var spec = DUST.CLOUD.specs[specIndex];
                for (otherSpecIndex in DUST.CLOUD.specs) {
                    var otherSpec = DUST.CLOUD.specs[otherSpecIndex];

                    if (specIndex !== otherSpecIndex) {
                        DUST.MATH.calcPath(spec, otherSpec);
                    }
                }
            }
        },

        drawSpec: function (x, y, color) {
            var context = DUST.context;

            context.beginPath();
            context.rect(x, y, 10, 10);
            context.fillStyle = '#' + color;
            context.fill();
        }
    };
})();
