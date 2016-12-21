import {HeavenlyBody} from "../Objects/heavenlyBody";


export class InitiumMath {
    private static gravitationalConstant: number = 6.674 * Math.pow(10, -11);
    private static framesPerYear = 3153;

    public static getGravitationalConstant() {
        return this.gravitationalConstant;
    }

    public setGravitationalConstant(constant) {
    }

    public toDegrees(radians: number) {
        return 57.2957795 * radians;
    }

    public toRadians(degrees) {
        return degrees * 0.017453293;
    }

    public static calcGravity(object1: HeavenlyBody, object2: HeavenlyBody) {
        // In the orbit we will almost always be at an angle.
        // To get this angle we will make a virtual triangle.
        let sideA = Math.abs(object1.getX() - object2.getX());
        let sideB = Math.abs(object1.getY() - object2.getY());
        // Calculate the real distance between the 2 sides (basically the hypotenuse of the triangle)
        let distance = this.calcDistance(sideA, sideB);
        // Now knowing the distance and the masses of the celestial bodies we can calculate the amount of
        // gravitational force they apply with the formula , Fgrav = (Gm1m2)/d^2;
        // (gravitationalConstant*mass of body1 * mass of body 2)/distance ^2)
        return this.gravitationalConstant * ((object1.getMass() * object2.getMass()) / Math.pow(distance, 2));
    }

    public randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    public static calcDistance(sideA: number, sideB: number) {
        // Pytagoras nuff said.
        return Math.sqrt((Math.pow(sideA, 2) + Math.pow(sideB, 2)));
    };

    public static calcForce(gravity: number, object1: HeavenlyBody, object2: HeavenlyBody) {
        let main, satellite;

        //check which one is main body and  which on the satellite.
        if (object1.getMass() > object2.getMass()) {
            main = object1;
            satellite = object2;
        } else {
            main = object2;
            satellite = object1;
        }

        // Again use a triangle to calculate the angle between one object and the other.
        let angle = Math.atan2(main.getX() - satellite.getX(), main.getY() - satellite.getY());

        // Get the next plot of the planet.
        satellite.getVelocity().forceX = satellite.getVelocity().forceX + (Math.sin(angle) * gravity);
        satellite.getVelocity().forceY = satellite.getVelocity().forceY + (Math.cos(angle) * gravity);
        console.debug(satellite.getLabel() + ' gravity : '  + gravity);
        console.debug(satellite.getLabel() + ' : '  + satellite.getVelocity().forceX + ',' + satellite.getVelocity().forceY);
        console.debug(satellite.getLabel() + ' : '  + angle);
        return angle;
    }
}