import { Point } from './types';

export const Hexogon = (pt: Point) => {
  const { xPos, yPos } = pt;

  const display = (): void => {
    console.log(`> xPos ${xPos}, yPos ${yPos}`);
  }

  return {
    display
  }
}