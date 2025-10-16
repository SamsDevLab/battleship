import { Gameboard } from "./gameboard.js";

export const Player = () => {
  return {
    realPlayer: function (name) {
      return {
        name: name,
        board: Gameboard(),
      };
    },
    computerPlayer: function () {
      return {
        board: Gameboard(),
      };
    },
  };
};
