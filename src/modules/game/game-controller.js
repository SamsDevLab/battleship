import { Player } from "./player.js";

export const GameController = () => {
  return {
    initGame: function () {
      const realPlayerObj = Player().realPlayer();
      const computerPlayerObj = Player().computerPlayer();

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
