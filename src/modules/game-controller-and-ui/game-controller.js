import { Gameboard } from "../game-controller-and-ui/index.js";
import { Ship } from "../game-controller-and-ui/index.js";
import { Player } from "../game-controller-and-ui/index.js";

const patrolBoat = Ship("patrol", 2);
const submarineBoat = Ship("submarine", 3);
const destroyerBoat = Ship("destroyer", 3);
const battleshipBoat = Ship("battleship", 4);
const carrierBoat = Ship("carrier", 5);

export const InitGame = () => {
  const realPlayerObj = Player().realPlayer("Sam's Dev Lab");
  const computerPlayerObj = Player().computerPlayer();

  const playerBoard = realPlayerObj.board;

  playerBoard.placeShip(patrolBoat, 0, 4, "horizontal");
  playerBoard.placeShip(submarineBoat, 0, 9, "vertical");
  playerBoard.placeShip(destroyerBoat, 4, 2, "vertical");
  playerBoard.placeShip(battleshipBoat, 7, 5, "horizontal");
  playerBoard.placeShip(carrierBoat, 4, 0, "vertical");

  const computerBoard = computerPlayerObj.board;

  computerBoard.placeShip(patrolBoat, 0, 4, "horizontal");
  computerBoard.placeShip(submarineBoat, 0, 9, "vertical");
  computerBoard.placeShip(destroyerBoat, 4, 2, "vertical");
  computerBoard.placeShip(battleshipBoat, 7, 5, "horizontal");
  computerBoard.placeShip(carrierBoat, 4, 0, "vertical");

  return { realPlayerObj, computerPlayerObj };
};

InitGame();

/*
  Boats:
  cB = carrierBoat | size = 5
  bB = battleshipBoat | size = 4
  dB = destroyerBoat | size = 3
  sB = submarineBoat | size = 3
  pb = patrolBoat | size = 2

  [     0      1      2      3      4      5      6      7      8      9
  0: [nulll, nulll, nulll, nulll, pBoat, pBoat, nulll, nulll, nulll, sBoat,]
  1: [nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, sBoat,]
  2: [nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, sBoat,]
  3: [nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  4: [cBoat, nulll, dBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  5: [cBoat, nulll, dBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  6: [cBoat, nulll, dBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  7: [cBoat, nulll, nulll, nulll, nulll, bBoat, bBoat, bBoat, bBoat, nulll,]
  8: [cBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  9: [nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  ]

  */
