import {Renderer} from "renderer";

export default class Initium {
    private fps: number;
    private context: any;
    private loop: boolean;
    private scene: Array<any>;
    private renderer: Renderer;
    private counter: number = 1;

    constructor(renderer: Renderer) {
        this.fps = 60;
        this.context = null;
        this.loop = false;
        this.scene = [];
        this.renderer = renderer;
    }

    public addToScene(item: any) {
        this.scene.push(item);

    }

    protected update() {
        $.each(this.scene,
            function (idx, object1) {
                object1.update();
            }
        );
    }

    public start() {
        let image = new ImageLoader();
        image.load();

        this.limitLoop(this.doStuff);
    }

    public doStuff(game: Initium) {
        if (game.counter++ < 3153) {
            game.update();
        }

        game.renderer.draw(game.getScene());
    }

    public getScene() {
        return this.scene;
    }

    private limitLoop(fn: any) {

        // Use let then = Date.now(); if you
        // don't care about targetting < IE9
        let then = new Date().getTime();

        let interval = 1001 / this.fps;
        let game = this;
        return (function loop() {
            requestAnimationFrame(loop);

            // again, Date.now() if it's available
            let now = new Date().getTime();
            let delta = now - then;

            if (delta > interval) {
                // Update time
                // now - (delta % interval) is an improvement over just
                // using then = now, which can end up lowering overall fps
                then = now - (delta % interval);

                // call the fn
                fn(game);

            }
        })();
    }
}