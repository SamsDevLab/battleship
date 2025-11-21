import { Player } from "./player.js";
// Need to grab realPlayerObj and computerPlayerObj from State.
// Both should be kept in "State", I think

export const GameController = () => {
  return {
    initGame: function () {
      const realPlayerObj = Player().realPlayer();
      const computerPlayerObj = Player().computerPlayer();

      return { realPlayerObj, computerPlayerObj };
    },
    placeBoatInPlayerArr: function () {
      realPlayerObj.gameMechanics.placeShip(
        Ship(currentBoat.name, currentBoat.length),
        currentBoat.row,
        currentBoat.column,
        currentBoat.direction,
      );
    },
    placeBoatInComputerArr: function () {
      computerPlayerObj.gameMechanics.placeShip(
        Ship(currentBoat.name, currentBoat.length),
        currentBoat.row,
        currentBoat.column,
        currentBoat.direction,
      );
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
