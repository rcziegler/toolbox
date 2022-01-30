/** */
import hexogonWorld from "./src/hexogonWorld";

//inputHandler.enableDebug();

const FPS = 30;
const MS_PER_SECOND = 1000;
const INTERVAL = MS_PER_SECOND / FPS;

let world = document.getElementById('divWorld');

let now;
let then = Date.now();
let delta;

/** */
const render = () => {

  window.requestAnimationFrame(render);

  /** */
  now = Date.now();
  delta = now - then;

  if (delta > INTERVAL) {
    then = now - (delta % INTERVAL);

    hexogonWorld.render(world);
  }

}

render();