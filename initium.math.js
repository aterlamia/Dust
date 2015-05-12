var Initium = Initium || {};

(function ($) {

    Initium.Math = {
        gravitationalConstant: 6.674 * Math.pow(10, -11),

        setGravitationalConstant: function
            (constant) {
            Dust.gravitationalConstant = constant;
        },

        toDegrees: function (radians) {
            return 57.2957795 * radians;
        },

        toRadians: function (degrees) {
            return degrees * 0.017453293;
        },

        calcGravity: function (object1, object2) {
            var sideA = Math.abs(object1.x - object2.x);
            var sideB = Math.abs(object1.y - object2.y);
            var distance = Initium.Math.calcDistance(sideA, sideB);

            return Initium.Math.gravitationalConstant * ((object1.mass * object2.mass) / Math.pow(distance, 2));

        },

        randomIntFromInterval: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        calcDistance: function (sideA, sideB) {
            return Math.sqrt((Math.pow(sideA, 2) + Math.pow(sideB, 2)));
        },

        calcForce: function (gravity, object1, object2) {
            var main, satelite;

            //check which one is main body and  which on the satalite.
            if (object1.mass > object2.mass) {
                main = object1;
                satelite = object2;
            } else {
                main = object2;
                satelite = object1;
            }

            var angle = Math.atan2(main.x - satelite.x, main.y - satelite.y);

            satelite.velocity.forceX = satelite.velocity.forceX + (Math.sin(angle) * gravity);
            satelite.velocity.forceY = satelite.velocity.forceY + (Math.cos(angle) * gravity);

            return angle;
        }
    }
})(jQuery);
