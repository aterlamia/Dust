import {Planet} from "planet";
import {InitiumMath} from "../Utils/math";
import {Renderer} from "../renderer";
import {HeavenlyBody} from "heavenlyBody";

export class Star implements HeavenlyBody {
    getVelocity(): {forceX: number; forceY: number} {
        return {forceX: 1, forceY: 1};
    }

    getMass(): number {
        return this._mass;
    }


    getX(): number {
        return this._x;
    }

    getY(): number {
        return this._y;
    }

    private _maxPlanetaryInfluence: number;
    private _radius: number;
    private _x: number;
    private _y: number;
    private _mass: number;
    private _orbitals: Array<Planet>;
    private _renderer: Renderer;

    constructor(x: number, y: number, mass: number, radius: number, maxPlanetaryInfluence: number, renderer: Renderer) {
        this._x = x;
        this._y = y;
        this._mass = mass;
        this._radius = radius;
        this._maxPlanetaryInfluence = maxPlanetaryInfluence;
        this._renderer = renderer;
        this._orbitals = [];
    }

    public addOrbital(distance: number, mass: number, radius: number, color: string, label: string, modifier: number) {
        modifier = modifier || 1;
        distance = distance / modifier;
        let planetX = this._x - distance;


        let planet = new Planet(this._renderer, planetX, this._y, mass, radius, distance, this);

        // The time it would take for one complete orbit.
        let time = Math.sqrt((4 * Math.pow(Math.PI, 2) * (Math.pow((distance), 3))) / ((this._mass) * InitiumMath.getGravitationalConstant()));

        // All planets start at the top so calculate the initial horizontal velocity.
        // Every step we need to make has to be the circumfence of the orbit divided by the time to move the planet the
        // correct amount of distance. This is just liniear distance later we will make this circular.
        let v = (2 * Math.PI * (distance)) / time;

        // let time = Math.sqrt((4 * Math.pow(Math.PI, 2) * (Math.pow((distance * modifier), 3))) / ((this._mass + mass) * InitiumMath.getGravitationalConstant()  ));
        // let v = (2 * Math.PI * (distance * modifier)) / time;

        planet.setVelocity({forceX: 0, forceY: v});
        planet.setColor(color);
        planet.setLabel(label || 'unknown');
        planet.setModifier(modifier);

        this._orbitals.push(planet);
    }

    public update() {
        let self = this;
        $.each(this._orbitals,
            function (idx: number, orbital: Planet) {
                // The planet and the star will exersise gravity on eachother.
                let grav = InitiumMath.calcGravity(self, orbital);

                // Now we need to calculate the forces/velocities the planet has to
                // stay in orbit.
                InitiumMath.calcForce(grav, self, orbital);

                orbital.setX(orbital.getX() + orbital.getVelocity().forceX);
                orbital.setY(orbital.getY() + orbital.getVelocity().forceY);
            }
        );

    };

    public render() {
        this._renderer.drawCircle(this._y, this._x, this._radius, 'FFFF00');

        $.each(this._orbitals,
            function (idx: number, orbital: Planet) {
                orbital.render();
            }
        );
    };
}