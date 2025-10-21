// import { InitGame } from "../game-controller-and-ui/index.js";
import { GameController } from "./game-controller.js";

/*
Dom Responsibilites:

✅ • Render divs and buttons
 ✅  • Add classes to divs and buttons

• Accept input from user (name)

✅ • Allow users to click on squares and pass coords to gameController to make a 'hit'

• Dragging & dropping ships onto coordinates (this will work in tandem with placeShip)
  in GameController once the system is implemented

• Render player turn to a banner that announces whose turn it is

• Render name of player under board

*/

const gameController = GameController();
const playerObjs = gameController.initGame();

export const RenderToDom = () => {
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

        if (board[i][j] === "missed") {
          const missedCircle = document.createElement("span");
          missedCircle.classList.add("missed-circle");
          boardColumn.dataset.hitOrMiss = "missed";
          boardColumn.append(missedCircle);
        } else if (board[i][j] !== null) {
          boardColumn.textContent = board[i][j].name;
        }
        boardRow.append(boardColumn);
      }
    }
  };

  const playerDiv = document.querySelector("[data-board='player']");
  const computerDiv = document.querySelector("[data-board='computer']");

  addRowsAndColumns(playerObjs.realPlayerObj.gameMechanics.board, playerDiv);
  addRowsAndColumns(
    playerObjs.computerPlayerObj.gameMechanics.board,
    computerDiv,
  );
};

const addButtonFunctionality = (obj) => {
  const computerBoard = document.querySelector("[data-board='computer']");

  computerBoard.addEventListener("click", (event) => {
    if (
      event.target.dataset.hitOrMiss === "missed" ||
      event.target.parentNode.dataset.hitOrMiss === "missed"
    ) {
      console.log("This has already been clicked!");
      return "This has already been clicked!";
    }

    const targetRow = event.target.parentElement.dataset.row;
    const targetColumn = event.target.dataset.column;

    gameController.attack(targetRow, targetColumn, obj);

    const boards = Array.from(document.querySelectorAll("[data-board]"));

    boards.forEach((board) => {
      board.innerHTML = "";
    });

    RenderToDom();
  });
  /* 
 When a hit occurs:

  • Re-render the board
  • Any square that has been marked as "missed" will need to:
    • re-render with a colorful circle which denotes a "miss"
    • Send message to user if they try to re-click on a "missed" target
  • Any square that results in a 'hit' will need to be marked in a different color/graphic
    and prevent user from re-clicking

    After this is done, you may want to manage whose turn it is by creating a banner for both
    the Player and the computer

    And you'll have to start looking into how to manipulate the computer so that it chooses
    a random attack on the player board
    */
};

RenderToDom();
addButtonFunctionality(playerObjs.computerPlayerObj);
/*
Polished edits to consider for dom.js module:

• Refactoring 'renderPlayerBoardsToDom' to make it less clunky
*/
