import { Gameboard } from "./index.js";

export const Player = () => {
  return {
    realPlayer: function (name) {
      return { name: name, gameMechanics: Gameboard() };
    },
    computerPlayer: function () {
      return { name: "Computer", gameMechanics: Gameboard() };
    },
  };
};
