
import inputHandler from "../../inputHandler/src/inputHandler"
import { Point } from './types';
import { Hexogon } from "./hexogon";

const VIEWBOX_HEIGHT = 100;
const VIEWBOX_WIDTH = 100;

const WORLD_HEIGHT = 400;
const WORLD_WIDTH = 800;


let count = 0;

let speed = 4;

let xPos = 10;
let yPos = 10;

// let pt1: Point = { xPos: 10, yPos: 10};
// let pt2: Point = { xPos: 20, yPos: 20};
let hex1 = Hexogon({ xPos: 10, yPos: 10 });
let hex2 = Hexogon({ xPos: 20, yPos: 20 });

/** */
const hexogonWorld = {

  /** */
  render(world: HTMLElement) {
    console.log('> draw world');

    /** */
    const userInput = inputHandler.getUserInputs();
    const zoomScale = inputHandler.getScale();

    /// Handle user pressing "up"
    if (userInput.includes(inputHandler.KeyCode.KeyArrorUp) || userInput.includes(inputHandler.KeyCode.KeyW)) {
      console.log('up');
      yPos -= speed;
    }
    // Handle user pressing "down"
    if (userInput.includes(inputHandler.KeyCode.KeyArrowDown) || userInput.includes(inputHandler.KeyCode.KeyS)) {
      console.log('down');
      yPos += speed;
    }
    // Handle user pressing "left"
    if (userInput.includes(inputHandler.KeyCode.KeyArrowLeft) || userInput.includes(inputHandler.KeyCode.KeyA)) {
      console.log('left');
      xPos -= speed;
    }
    // Handle user pressing "right"
    if (userInput.includes(inputHandler.KeyCode.KeyArrowRight) || userInput.includes(inputHandler.KeyCode.KeyD)) {
      console.log('right');
      xPos += speed;
    }

    let x = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    x.setAttribute("height", WORLD_HEIGHT.toString());
    x.setAttribute("style", "border: 1px solid black")

    console.log(`> zoomScale ${zoomScale}`);
    const currHeight = WORLD_HEIGHT * zoomScale;
    const currWidth = WORLD_WIDTH * zoomScale;
    x.setAttribute("viewBox", `0 0 ${currHeight.toString()} ${currWidth.toString()}`);
    x.setAttribute("width", WORLD_WIDTH.toString());

    circle.setAttributeNS(null, 'cx', xPos.toString());
    circle.setAttributeNS(null, 'cy', yPos.toString());
    circle.setAttributeNS(null, 'r', "5");
    circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;');

    console.log(hex1.display());
    console.log(hex2.display());

    //world.innerHTML = (count++).toString();
    world.innerHTML = "";
    x.appendChild(circle);
    world.appendChild(x);
  }
}

export default hexogonWorld;