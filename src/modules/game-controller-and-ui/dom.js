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
✅ • Look into adding random shot from computer to player board
✅ • Use player name when updating who missed or hit shot in banner
✅ • Send message to user if they try to re-click on a "missed" target
✅ • Debug: Receiving an "undefined" on some shots to player board
✅ • Prevent computer from 'clicking' an already clicked target (see below)
✅ • Also some boats are being sunk even though they have only been hit one time   
✅ • Create conditions so that the game ends once one a player’s ships have all been sunk.
✅ • Create and style boat placement menu (svgs represent the boats)
✅ • Work on consistent sizing for board propagation

TO-DOs:
• Drop ships on board
• Render name of player under board
• Gap may be too large between D and E rows - looks larger than the others
• Dragging & dropping ships onto coordinates (this will work in tandem with placeShip)
  in GameController once the system is implemented
• Add actual boat coordinates? e.g. A1, B9, etc. so banner can read "Sam's Dev Lab hit at A1"
• Refactor
• Complete README
*/

const gameController = GameController();
const playerObjs = gameController.initGame();
const boatImages = Array.from(document.querySelectorAll("[data-boat-image]"));
const messageBanner = document.querySelector("#banner");
const playerDiv = document.querySelector("[data-board='player']");
const computerDiv = document.querySelector("[data-board='computer']");
const startScreen = document.querySelector("[data-modal='start-screen']");
const startScreenBoard = document.querySelector("[data-board='start-screen']");
const axisButton = document.querySelector("[data-button='axis']");
const winnerScreen = document.querySelector("[data-modal='winner-screen']");
const winnerHeader = document.querySelector("[data-winner-header]");
const modalButton = document.querySelector("[data-modal-button]");

let currentBoat = {};
const rows = startScreenBoard.children;

boatImages.forEach((image) => {
  image.addEventListener("click", (event) => {
    currentBoat.name = event.target.dataset.boatImage;
    currentBoat.length = +event.target.dataset.boatLength;
    currentBoat.direction = "horizontal";
  });
});

axisButton.addEventListener("click", () => {
  if (currentBoat.direction === "horizontal") {
    axisButton.textContent = "Vertical Axis";
    currentBoat.direction = "vertical";
  } else if (currentBoat.direction === "vertical") {
    axisButton.textContent = "Horizontal Axis";
    currentBoat.direction = "horizontal";
  }
});

const highlightedColumns = () => {
  let targetRow = rows[currentBoat.row];
  let columns = targetRow.children;
  let targetColumn = columns[currentBoat.column];

  if (currentBoat.direction === "horizontal") {
    for (let i = 0; i < currentBoat.length; i++) {
      targetColumn = columns[currentBoat.column + i];
      targetColumn.classList.toggle("highlight");
    }
  } else if (currentBoat.direction === "vertical") {
    for (let i = 0; i < currentBoat.length; i++) {
      targetRow = rows[currentBoat.row + i];
      columns = targetRow.children;
      targetColumn = columns[currentBoat.column];
      targetColumn.classList.toggle("highlight");
    }
  }
};

startScreenBoard.addEventListener("mouseover", (event) => {
  currentBoat.row = +event.target.parentElement.dataset.row;
  currentBoat.column = +event.target.dataset.column;
  highlightedColumns();
});

startScreenBoard.addEventListener("mouseout", () => {
  highlightedColumns();
  currentBoat.row = null;
  currentBoat.column = null;
});

// *********************** //

const openStartScreen = () => {
  startScreen.showModal();
  addRowsAndColumns(
    playerObjs.realPlayerObj.gameMechanics.board,
    startScreenBoard,
  );
};

const announceWinner = (winnerObj) => {
  winnerScreen.showModal();
  winnerHeader.textContent = `${winnerObj.name} wins the game!`;
};

modalButton.addEventListener("click", () => {
  winnerScreen.close();
});

const markPreviousAttackOnBoard = (attack, boardColumn) => {
  const markAttackSpan = document.createElement("span");
  markAttackSpan.classList.add(`${attack}-circle`);
  boardColumn.dataset.hitOrMiss = `${attack}`;
  boardColumn.append(markAttackSpan);
};

const getRandomCoords = (playerBoard) => {
  const row = Math.floor(Math.random(playerBoard.length) * 10);
  const col = Math.floor(Math.random(playerBoard[0].length) * 10);

  if (playerBoard[row][col] === "hit" || playerBoard[row][col] === "missed") {
    return getRandomCoords(playerBoard);
  } else {
    return { row, col };
  }
};

const attackPlayer = () => {
  const playerBoard = playerObjs.realPlayerObj.gameMechanics.board;

  let random = getRandomCoords(playerBoard);

  const attackResult = gameController.attack(
    random.row,
    random.col,
    playerObjs.realPlayerObj,
    playerObjs.computerPlayerObj,
  );

  if (attackResult === "All boats have been sunk!")
    announceWinner(playerObjs.computerPlayerObj);

  messageBanner.textContent = "";
  messageBanner.textContent = attackResult;

  RenderToDom();
};

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

export const RenderToDom = () => {
  playerDiv.textContent = "";
  computerDiv.textContent = "";

  addRowsAndColumns(playerObjs.realPlayerObj.gameMechanics.board, playerDiv);
  addRowsAndColumns(
    playerObjs.computerPlayerObj.gameMechanics.board,
    computerDiv,
  );
};

const addButtonFunctionality = () => {
  const computerBoard = document.querySelector("[data-board='computer']");

  computerBoard.addEventListener("click", (event) => {
    if (
      event.target.dataset.hitOrMiss === "missed" ||
      event.target.parentNode.dataset.hitOrMiss === "missed" ||
      event.target.dataset.hitOrMiss === "hit" ||
      event.target.parentNode.dataset.hitOrMiss === "hit"
    ) {
      messageBanner.textContent = "";
      messageBanner.textContent = "Target already hit. Try another target!";
      return;
    }

    const targetRow = event.target.parentElement.dataset.row;
    const targetColumn = event.target.dataset.column;

    const computerAttackResult = gameController.attack(
      targetRow,
      targetColumn,
      playerObjs.computerPlayerObj,
      playerObjs.realPlayerObj,
    );

    if (computerAttackResult === "All boats have been sunk!")
      announceWinner(playerObjs.realPlayerObj);

    messageBanner.textContent = "";
    messageBanner.textContent = computerAttackResult;

    RenderToDom();
    setTimeout(attackPlayer, 1200);
  });
};

openStartScreen();
RenderToDom();
addButtonFunctionality();
