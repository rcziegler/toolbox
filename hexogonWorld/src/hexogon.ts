import { Point } from './types';
import { transformPoint } from "./common";

export const Hexogon = (pt: Point, color: string) => {
  const { x, y } = pt;

  /** TODO | turn into a module w/toString() */
  const getPointStr = (pt: Point) => {
    return `${pt.x} ${pt.y} `;
  }

  const draw = (): SVGPathElement => {

    const size = 100;
    const angles = [0, -60, -120, -180, -240]; // last angle taken care of w/Z

    //let currPt = { x: 10, y: 10 };
    let currPt = pt;

    // set starting position
    let pathString = `M ${getPointStr(currPt)}`;
    // draw lines for each side
    angles.forEach(angle => {
      currPt = transformPoint(currPt, angle, size);
      pathString += `L ${getPointStr(currPt)}`;
    })

    pathString += `Z`;

    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute("d", pathString);
    path.setAttribute("fill", color);

    return path;
  }

  /** */
  const display = (): void => {
    console.log(`> xPos ${x}, yPos ${y}`);
  }

  return {
    display,
    draw
  }
}