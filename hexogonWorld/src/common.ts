import { Point } from "./types";

/** */
const getAsRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
}

/** */
export const transformPoint = (point: Point, degrees: number, length: number): Point => {
  const x2: number = point.x + length * Math.cos(getAsRadians(degrees));
  const y2: number = point.y - length * Math.sin(getAsRadians(degrees));
  return { x: x2, y: y2 };
};