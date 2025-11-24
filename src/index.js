/* 
Suggested modules:
dom/index.js — the entrypoint that imports the other dom modules and wires things to GameController. This is the file Odin expects.

dom/renderer.js — all DOM creation + update functions (addRowsAndColumns, markPreviousAttackOnBoard, RenderToDom, helpers).

dom/boatPlacementUI.js — UI-only boat selection / hover / highlight logic. Talks to gameController.placeShip() but computes UI coords.

dom/events.js — event listener registration (clicks/hover) and high-level handlers that call controller methods.

dom/helpers.js — tiny DOM util functions (closestRowColFromEl, createEl, setDataAttr).

game/ai.js — computer random placement & random shooting logic (pure functions that return coords).

game/game-controller.js — your existing GameController but moved heavier logic (computer placement loop, turn manager) out of DOM file.

state/ui-state.js (optional) — thin object for transient UI-only state (currentBoat selection, direction) that the DOM modules own.


*/
// import "./styles.css";
import { DOMHelpers } from "./modules/dom/dom-helpers.js";
import { Renderer } from "./modules/dom/renderer.js";
import { State } from "./modules/state/ui-state.js";
import { AttachEventListeners } from "./modules/dom/events.js";
import { GameController } from "./modules/game/game-controller.js";
import { BoatPlacement } from "./modules/dom/boat-placement-ui.js";
import { ComputerBoatPlacement } from "./modules/game/ai-boat-placement.js";

const domHelpers = DOMHelpers();
// const renderer = Renderer(domHelpers);
const gameController = GameController();
const playerObjs = gameController.initGame();

const state = State(playerObjs);
state.storeObjects(playerObjs);

const renderer = Renderer(domHelpers, state);

const computerBoatPlacement = ComputerBoatPlacement(state);

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

AttachEventListeners(domHelpers, boatPlacement);

// export { DOMHelpers };
// export { GameController };
// export { BoatPlacement };
// export { ComputerBoatPlacement };
// export { State };
