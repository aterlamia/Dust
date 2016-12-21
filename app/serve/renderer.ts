export class Renderer {
    private _context: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

    }

    public draw(scene) {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for (var objectIdx in scene) {
            var object = scene[objectIdx];
            object.render();
        }
    }

    public drawCircle(x: number, y: number, radius: number, color: string|null) {
        if (typeof(color) === 'undefined') {
            color = 'ffaa22';
        }
        this._context.beginPath();
        this._context.arc(x, y, radius, 0, 2 * Math.PI);
        this._context.fillStyle = '#' + color;
        this._context.fill();
    }

    public drawOrbit(x: number, y: number, radius: number, color: string) {
        if (typeof(color) === 'undefined') {
            color = 'ffaa22';
        }
        this._context.beginPath();
        this._context.arc(x, y, radius, 0, 2 * Math.PI);
        this._context.strokeStyle = 'green';
        this._context.stroke();
    }
}