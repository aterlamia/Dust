import Initium from "initium";
import {Renderer} from "renderer";
import {Star} from "./Objects/star";

let canvas = <HTMLCanvasElement> $('canvas').get(0);
//
// $('canvas').first().width(3200);
// $('canvas').first().height(3200);
canvas.width = 3500;
canvas.height = 3500;
let renderer = new Renderer(canvas);
let game = new Initium(renderer);

renderer.drawCircle(30, 30, 20, 'ffdd33');

renderer.drawCircle(70, 30, 20, 'ddeeff');
let sun = new Star(500, 500, 198900000000, 20, 500, renderer);
// sun.addOrbital(57.91, 1, 5, 'ffddaa', 'mercury', 1);
// sun.addOrbital(108.2, 1, 10, '34a8da', 'venus', 1);
sun.addOrbital(149.5, 1, 10, '342332', 'earth', 1);
sun.addOrbital(149.5, 1, 10, '342332', 'earth', 2);
sun.addOrbital(227.9, 1, 7, '33hd23', 'mars', 1);
sun.addOrbital(778.5, 1, 13, '34ff32', 'jupiter', 3);
// sun.addOrbital(778.5, 1, 13, '7766ee', 'jupiter', 1);
//
// Initium.Main.scene.push(sun);
game.addToScene(sun);
// Initium.start();

game.start();
