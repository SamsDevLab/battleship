import { Gameboard } from "../game-controller-and-ui/index.js";
import { Ship } from "../game-controller-and-ui/index.js";
import { Player } from "../game-controller-and-ui/index.js";

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

GameController();
