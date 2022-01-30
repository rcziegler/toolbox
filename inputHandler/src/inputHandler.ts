import { KeyCode } from "./types";

/** */
let scale: number = 1;
/** */
let userInputs: string[] = [];
/** */
let userInputsDebug: boolean = false;

/** */
const debug = () => {
  console.log(userInputs);
}

/** */
const addInput = (event: KeyboardEvent) => {
  if (!userInputs.includes(event.code)) {
    userInputs.push(event.code);
  }
  userInputsDebug ? debug() : null;
}

/** */
const deleteInput = (event: KeyboardEvent) => {
  if (userInputs.includes(event.code)) {
    userInputs.splice(userInputs.indexOf(event.code), 1);
  }
  userInputsDebug ? debug() : null;
}

/** */
document.addEventListener('keypress', (event: KeyboardEvent) => { })

/** */
document.addEventListener('keydown', (event: KeyboardEvent) => {
  addInput(event);
});

/** */
document.addEventListener('keyup', (event: KeyboardEvent) => {
  deleteInput(event);
});

/** */
document.addEventListener('wheel', (event: WheelEvent) => {
  //event.preventDefault();

  const { deltaY } = event;

  if (deltaY > 0) {
    // Zoom in
    scale += 0.01;
  } else {
    // Zoom out
    scale -= 0.01;
  }
  console.log(`> zoom level ${scale}`);
});

/** */
const inputHandler = {
  /** */
  enableDebug() {
    userInputsDebug = true;
  },
  /** */
  getUserInputs() {
    return userInputs;
  },
  /** */
  KeyCode: KeyCode,
  /** */
  getScale() {
    return scale;
  }
}

export default inputHandler;
