// import { InitGame } from "../game-controller-and-ui/index.js";
import { GameController } from "./game-controller.js";

/*
Dom Responsibilites:

COMPLETE:
✅ • Render divs and buttons
✅ • Add classes to divs and buttons
✅ • Allow users to click on squares and pass coords to gameController to make a 'hit'
✅ • Re-render the board
✅ • Re-render a 'miss' with a colorful circle which denotes a "miss"  
✅ • Any square that results in a 'hit' will need to be marked in a different color/graphic
✅ • Debug why boards are loading duplicates upon rendering the project
✅ • Once a button is clicked, the re-render doesn't duplicate (figure out why)
✅ • Once debugged, make a commit
✅ • Debug hits - they are no longer registering on the board

TO-DOs:  
✅ • Send message to user if they try to re-click on a "missed" target
• Look into adding random shot from computer to player board
• Render name of player under board
• Accept input from user (name)
• Dragging & dropping ships onto coordinates (this will work in tandem with placeShip)
  in GameController once the system is implemented
*/

const gameController = GameController();
const playerObjs = gameController.initGame();

const markPreviousAttackOnBoard = (attack, boardColumn) => {
  const markAttackSpan = document.createElement("span");
  markAttackSpan.classList.add(`${attack}-circle`);
  boardColumn.dataset.hitOrMiss = `${attack}`;
  boardColumn.append(markAttackSpan);
};

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

        if (board[i][j] === "missed" || board[i][j] === "hit") {
          markPreviousAttackOnBoard(board[i][j], boardColumn);
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
  const messageBanner = document.querySelector("#banner");

  computerBoard.addEventListener("click", (event) => {
    if (
      event.target.dataset.hitOrMiss === "missed" ||
      event.target.parentNode.dataset.hitOrMiss === "missed" ||
      event.target.dataset.hitOrMiss === "hit" ||
      event.target.parentNode.dataset.hitOrMiss === "hit"
    ) {
      console.log("This has already been clicked!");
      return "This has already been clicked!";
    }

    const targetRow = event.target.parentElement.dataset.row;
    const targetColumn = event.target.dataset.column;

    const result = gameController.attack(targetRow, targetColumn, obj);
    messageBanner.innerText = "";
    messageBanner.innerText = result;

    const boards = Array.from(document.querySelectorAll("[data-board]"));

    boards.forEach((board) => {
      board.innerHTML = "";
    });

    RenderToDom();
  });
};

RenderToDom();
addButtonFunctionality(playerObjs.computerPlayerObj);
