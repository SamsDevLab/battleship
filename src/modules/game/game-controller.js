import { Player } from "./player.js";
import { Ship } from "./ship.js";

export const GameController = () => {
  return {
    initGame: function () {
      const realPlayerObj = Player().realPlayer();
      const computerPlayerObj = Player().computerPlayer();

      return { realPlayerObj, computerPlayerObj };
    },
    placeBoatInPlayerArr: function (currentBoat, realPlayer) {
      realPlayer.gameMechanics.placeShip(
        Ship(currentBoat.name, currentBoat.length),
        currentBoat.row,
        currentBoat.column,
        currentBoat.direction,
      );
    },
    placeBoatInComputerArr: function (state) {
      const computerPlayer = state.getComputerPlayer();
      const currentBoat = state.getCurrentBoat();

      computerPlayer.gameMechanics.placeShip(
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
