// import { InitGame } from "../game-controller-and-ui/index.js";
import { GameController } from "./game-controller.js";

/*
Dom Responsibilites:

• Render divs and buttons
    • Add classes to divs and buttons

• Accept input from user (name)

• Allow users to click on squares and pass coords to gameController to make a 'hit'

• Dragging & dropping ships onto coordinates (this will work in tandem with placeShip)
  in GameController once the system is implemented

• Render player turn to a banner that announces whose turn it is

• Render name of player under board

*/

const gameController = GameController();

const renderPlayerBoardsToDom = (playerBoard, computerBoard) => {
  const divs = Array.from(document.querySelectorAll("[data-board]"));
  const playerDiv = divs[0];
  const computerDiv = divs[1];

  const addRowsAndColumns = (board, div) => {
    for (let i = 0; i < board.length; i++) {
      const boardRow = document.createElement("div");
      boardRow.classList.add("row");
      boardRow.dataset.row = `${i}`;
      div.append(boardRow);

      for (let j = 0; j < board.length; j++) {
        const boardColumn = document.createElement("button");
        boardColumn.classList.add("column");
        boardColumn.dataset.column = `${j}`;
        if (board[i][j] !== null) {
          boardColumn.textContent = board[i][j].name;
        }
        boardRow.append(boardColumn);
      }
    }
  };

  addRowsAndColumns(playerBoard, playerDiv);
  addRowsAndColumns(computerBoard, computerDiv);
};

const addButtonFunctionality = () => {
  const boards = Array.from(document.querySelectorAll("[data-board]"));

  boards.forEach((board) => {
    board.addEventListener("click", (event) => {
      const targetRow = event.target.parentElement.dataset.row;
      const targetColumn = event.target.dataset.column;

      gameController.attack(targetRow, targetColumn);
    });
  });
};

export const RenderToDom = () => {
  const players = gameController.initGame();

  const realPlayerBoard = players.realPlayerObj.gameMechanics.board;
  const computerPlayerBoard = players.computerPlayerObj.gameMechanics.board;

  renderPlayerBoardsToDom(realPlayerBoard, computerPlayerBoard);
  addButtonFunctionality();
};
