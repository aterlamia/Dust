var DUST = DUST || {};

(function () {
    DUST.MATH = {
        gravitationalConstant: 4600,

        setGravitationalConstant: function (constant) {
            Dust.gravitationalConstant = constant;
        },

        toDegrees: function (radians) {
            return 57.2957795 * radians;
        },

        calcGravity: function (object1, object2) {
            DUST.MAIN.log('Gravity calc');

            var sideA = Math.abs(object1.X - object2.X);
            var sideB = Math.abs(object1.Y - object2.Y);

            DUST.MAIN.log('Side a' + sideA);
            DUST.MAIN.log('Side b' + sideB);

            var distance = DUST.MATH.calcDistance(sideA, sideB);

            DUST.MAIN.log('Distance = ' + distance);

            DUST.MAIN.log('MASS object 1 ' + object1.MASS);
            DUST.MAIN.log('MASS object 2 ' + object2.MASS);


            var gravity = DUST.MATH.gravitationalConstant * ((object1.MASS * object2.MASS) / Math.pow(distance, 2));

            DUST.MAIN.log('Gravity = ' + gravity);
            return gravity;
        },

        calcPath: function (object1, object2) {

            var ctx = DUST.context;
            var smallestObject = null;
            var largestObject = null;

            if (object1.MASS > object2.MASS) {
                smallestObject = object2;
                largestObject = object1;
            } else {
                smallestObject = object1;
                largestObject = object2;
            }

            var stepSize = 2;


            var grav = DUST.MATH.calcGravity(smallestObject, largestObject);

            var xOffset = 1;
            var yOffset = 1;

            if (smallestObject.X > largestObject.X) {
                xOffset = -1;
            }

            if (smallestObject.Y > largestObject.Y) {
                yOffset = -1;
            }

            if (grav > 1) {
                var gravOffsetX = (grav - 1) * (xOffset);

                smallestObject.VELOCITY.X += gravOffsetX;

                var gravOffsetY = (grav - 1) * (yOffset);
                smallestObject.VELOCITY.Y += gravOffsetY
            }

            if (smallestObject.VELOCITY.Y > 50) {
                smallestObject.VELOCITY.Y = 50
            }

            if (smallestObject.VELOCITY.Y < -50) {
                smallestObject.VELOCITY.Y = -50
            }

            if (smallestObject.VELOCITY.X > 50) {
                smallestObject.VELOCITY.X = 50
            }

            if (smallestObject.VELOCITY.X < -50) {
                smallestObject.VELOCITY.X = -50
            }

            ctx.beginPath();
            ctx.moveTo(smallestObject.X, smallestObject.Y);

            smallestObject.X += smallestObject.VELOCITY.X;
            smallestObject.Y += smallestObject.VELOCITY.Y;

            ctx.lineTo(smallestObject.X, smallestObject.Y);
            ctx.stroke();
            ctx.rect(smallestObject.X, smallestObject.Y, 10, 10);
            ctx.fillStyle = 'red';
            ctx.fill();
        },

        calcDistance: function (sideA, sideB) {
            return Math.sqrt((Math.pow(sideA, 2) + Math.pow(sideB, 2)));
        }
    }
})();
