import "./styles.css";
import { DOMHelpers } from "./modules/dom/dom-helpers.js";
import { Renderer } from "./modules/dom/renderer.js";
import { State } from "./modules/state/ui-state.js";
import { AttachEventListeners } from "./modules/dom/events.js";
import { GameController } from "./modules/game/game-controller.js";
import { BoatPlacement } from "./modules/dom/boat-placement-ui.js";
import { ComputerBoatPlacement } from "./modules/game/ai-boat-placement.js";
import { GameUI } from "./modules/dom/game-ui.js";
import { GameReset } from "./modules/game/game-reset.js";

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

const gameUI = GameUI(domHelpers, gameController, state, renderer);
const gameReset = GameReset(domHelpers, gameController, state, renderer);

AttachEventListeners(domHelpers, boatPlacement, gameUI, gameReset);
