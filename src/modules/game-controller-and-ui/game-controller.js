import { Gameboard } from "../game-controller-and-ui/index.js";
import { Ship } from "../game-controller-and-ui/index.js";
import { Player } from "../game-controller-and-ui/index.js";

/*
Responsibilities of Game Controller:
• Click events in dom.js will pass coords to the GameController to make a 'shot' at those
coords. If the space is not null, there will be a 'hit' on a boat. If the space IS 'null'
the column will be marked as 'missed'
  • After hit is made, the next turn should be made by the opposite player
  • Will need some type of fn in place for computerPlayer so it can make a random hit
    on the board

• DOM passes name input to GameController to give realPlayer a name??
  • Maybe does this through InitGame

• DOM passes boat placement coords to GameController so GameController can utilize
placeShip ( this will happen when Drag and Drop system is in place)

*/

const patrolBoat = Ship("patrol", 2);
const submarineBoat = Ship("submarine", 3);
const destroyerBoat = Ship("destroyer", 3);
const battleshipBoat = Ship("battleship", 4);
const carrierBoat = Ship("carrier", 5);

// Second Draft:
export const GameController = () => {
  return {
    initGame: function () {
      /*
      This method will be refactored in the future as there will be a drag and drop system
      from the DOM that will pass the coordinates to initGame to properly place the boats
      */

      const realPlayerObj = Player().realPlayer("Sam's Dev Lab");
      const computerPlayerObj = Player().computerPlayer();

      const playerGameMechanics = realPlayerObj.gameMechanics;

      playerGameMechanics.placeShip(patrolBoat, 0, 4, "horizontal");
      playerGameMechanics.placeShip(submarineBoat, 0, 9, "vertical");
      playerGameMechanics.placeShip(destroyerBoat, 4, 2, "vertical");
      playerGameMechanics.placeShip(battleshipBoat, 7, 5, "horizontal");
      playerGameMechanics.placeShip(carrierBoat, 4, 0, "vertical");

      const computerGameMechanics = computerPlayerObj.gameMechanics;

      computerGameMechanics.placeShip(patrolBoat, 0, 4, "horizontal");
      computerGameMechanics.placeShip(submarineBoat, 0, 9, "vertical");
      computerGameMechanics.placeShip(destroyerBoat, 4, 2, "vertical");
      computerGameMechanics.placeShip(battleshipBoat, 7, 5, "horizontal");
      computerGameMechanics.placeShip(carrierBoat, 4, 0, "vertical");

      return { realPlayerObj, computerPlayerObj };
    },
    attack: function (row, column, opponentObj, attackerObj) {
      const result = opponentObj.gameMechanics.receiveAttack(
        row,
        column,
        attackerObj,
      );

      return result;
    },
  };
};

GameController();

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
