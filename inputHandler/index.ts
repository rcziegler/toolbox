/** */
import inputHandler from "./src/inputHandler";

//inputHandler.enableDebug();

const displayUserInputs = document.getElementById('divUserInputs');

/** */
const render = () => {

  displayUserInputs.innerHTML = inputHandler.getUserInputs().toString();


  window.requestAnimationFrame(render);
}

render()
//window.requestAnimationFrame(render);
