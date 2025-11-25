/* 
Item Checklist - Things to Address
• Finish migrating all code from dom.js to appropriate modules
✅ • Axis button needs to automatically move back to "Horizontal" after placing a boat
✅ • Fix bug in ai-boat-placement

*/
// import "./styles.css";
import { DOMHelpers } from "./modules/dom/dom-helpers.js";
import { Renderer } from "./modules/dom/renderer.js";
import { State } from "./modules/state/ui-state.js";
import { AttachEventListeners } from "./modules/dom/events.js";
import { GameController } from "./modules/game/game-controller.js";
import { BoatPlacement } from "./modules/dom/boat-placement-ui.js";
import { ComputerBoatPlacement } from "./modules/game/ai-boat-placement.js";
import { GameUI } from "./modules/dom/game-ui.js";

const domHelpers = DOMHelpers();
const gameController = GameController();
const playerObjs = gameController.initGame();

const state = State();
state.storeObjects(playerObjs);

const renderer = Renderer(domHelpers, state);

const computerBoatPlacement = ComputerBoatPlacement(state, domHelpers);

renderer.openStartScreen(
  playerObjs.realPlayerObj.gameMechanics.board,
  domHelpers.startScreenBoard,
  domHelpers.startScreen,
);

const boatPlacement = BoatPlacement(
  domHelpers,
  state,
  gameController,
  computerBoatPlacement,
  renderer,
);

const gameUI = GameUI();

AttachEventListeners(domHelpers, boatPlacement, gameUI);

// export { DOMHelpers };
// export { GameController };
// export { BoatPlacement };
// export { ComputerBoatPlacement };
// export { State };
