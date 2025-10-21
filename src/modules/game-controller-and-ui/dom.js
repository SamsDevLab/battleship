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

const renderPlayerBoardsToDom = (playerObjs) => {
  const playerDivs = Array.from(document.querySelectorAll("[data-board]"));

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

  addRowsAndColumns(
    playerObjs.realPlayerObj.gameMechanics.board,
    playerDivs[0],
  );
  addRowsAndColumns(
    playerObjs.computerPlayerObj.gameMechanics.board,
    playerDivs[1],
  );
};

const addButtonFunctionality = (obj) => {
  const computerBoard = document.querySelector("[data-board='computer']");

  computerBoard.addEventListener("click", (event) => {
    const targetRow = event.target.parentElement.dataset.row;
    const targetColumn = event.target.dataset.column;

    gameController.attack(targetRow, targetColumn, obj);

    /* 
    Start in this general area tomorrow (10/21)
    
    "For attacks, let the user click on a coordinate in the enemy Gameboard. 
    Send the user input to methods on your objects, and re-render the boards to display the 
    new information."

    You'll need to re-render the board (here in dom.js) and probably disable the event
    listener on that particular column. Also, maybe use a mock up color to denote that 
    the cell has been clicked.

    After this is done, you may want to mangage whose turn it is by creating a banner for both
    the Player and the computer

    And you'll have to start looking into how to manipulate the computer so that it chooses
    a random attack on the player board
    */
  });
};

// Second Draft:
export const RenderToDom = () => {
  const playerObjs = gameController.initGame();

  renderPlayerBoardsToDom(playerObjs);

  addButtonFunctionality(playerObjs.computerPlayerObj);
};

/*
For committing later:

- Line 42: added '.name'
*/
