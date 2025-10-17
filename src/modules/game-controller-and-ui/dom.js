import { InitGame } from "../game-controller-and-ui/index.js";

const addRowsAndColumns = (boards) => {
  const rows = 10;
  const columns = 10;

  boards.forEach((board) => {
    for (let i = 0; i < rows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      board.append(row);
      for (let j = 0; j < columns; j++) {
        const column = document.createElement("div");
        column.classList.add("column");
        row.append(column);
      }
    }
  });
};

export const RenderToDom = () => {
  const players = InitGame();
  const realPlayerBoard = players.realPlayerObj;
  const computerPlayerBoard = players.computerPlayerObj;

  const boards = document.querySelectorAll(".board");

  addRowsAndColumns(boards);
};
