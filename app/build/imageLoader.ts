class ImageLoader {
    private planets : any;

    constructor() {
        this.planets = new Image();
    }

    public load() {
        this.planets.src = 'planets.png';
    }
}