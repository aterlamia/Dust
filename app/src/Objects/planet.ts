import {HeavenlyBody} from "heavenlyBody";
import {Renderer} from "../renderer";

export class Planet implements HeavenlyBody {
    getMass(): number {
        return this._mass;
    }

    getDistance(): number {
        return this._distance;
    }

    getLabel(): string {
        return this._label;
    }
    private _distance: number;
    private _y: number;
    private _x: number;
    private _mass: number;
    private _radius: number;
    private _velocity: {forceX: number; forceY: number};
    private _color: string;
    private _label: string;
    private _modifier: number;
    private _renderer: Renderer;
    private _parent: HeavenlyBody;

    constructor(renderer: Renderer, x: number, y: number, mass: number, radius: number, distance: number, parent: HeavenlyBody) {
        this._renderer = renderer;
        this._x = x;
        this._y = y;
        this._mass = mass;
        this._radius = radius;
        this._distance = distance;
        this._parent = parent;
    }

    public setVelocity(velocity: {forceX: number; forceY: number}) {
        this._velocity = velocity;
    }

    public setColor(color: string) {
        this._color = color;
    }

    public setLabel(label: string) {
        this._label = label;
    }

    public setModifier(modifier: number) {
        this._modifier = modifier;
    }

    public getVelocity(): {forceX: number; forceY: number} {
        return this._velocity;
    }

    public setY(value: number) {
        this._y = value;
    }

    public setX(value: number) {
        this._x = value;
    }

    public getX(): number {
        return this._x;
    }

    public getY(): number {
        return this._y;
    }

    public getRadius(): number {
        return this._radius;
    }

    public render() {
        this._renderer.drawCircle(this._y, this._x, this._radius, this._color);
        this._renderer.drawOrbit(this._parent.getY(), this._parent.getX(), this._distance, null);
    }
}