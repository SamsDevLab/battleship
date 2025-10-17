import { InitGame } from "../game-controller-and-ui/index.js";

const addRowsAndColumns = (playerArr, computerArr) => {
  const playerDiv = document.querySelector(".player");
  const computerDiv = document.querySelector(".computer");

  const createElements = (arr, div) => {
    arr.forEach((row) => {
      const boardRow = document.createElement("div");
      boardRow.classList.add("row");
      div.append(boardRow);

      row.forEach((column) => {
        const boardColumn = document.createElement("button");
        boardRow.append(boardColumn);
      });
    });
  };

  createElements(playerArr, playerDiv);
  createElements(computerArr, computerDiv);
};

export const RenderToDom = () => {
  const players = InitGame();

  const playerArr = players.realPlayerObj.board.board;
  const computerArr = players.computerPlayerObj.board.board;

  addRowsAndColumns(playerArr, computerArr);
};
