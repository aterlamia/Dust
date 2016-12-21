export default class Initium {
    private canvas;
    private fps;
    private context;
    private loop;
    private scene;
    constructor(canvas: any);
    protected update(): void;
    start(): void;
    doStuff(): void;
    private limitLoop(fn);
}
