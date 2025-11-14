// import { InitGame } from "../game-controller-and-ui/index.js";
import { Ship } from "../game-rules-and-logic/ship.js";
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
✅ • Respace everything on the startScreenBoard (it's overflowing the screen now)
✅ • Maybe respace the boats - I still don't care for the look
✅ • Click Listener + actions on the "Start Battle" button
✅ • Handle toggle bug in toggleAxisButton
✅ • Finish adding random boats to computer board in placeBoatInComputerArr and helpers
✅ • Style winner modal
✅ • Ensure that Enemy's Boats don't render to the board in the game

TO-DOs:
• Ensure that banner of start game begins with player name's turn
• Darken selected squares in start game upon click
• Look into hightlighted columns - play around witht the colors to get them just right
• Ensure that Play Again button in winner modal brings the start-modal back up and wipes the
  arrays
• Refactor
• Complete README
*/

const gameController = GameController();
const playerObjs = gameController.initGame();
const realPlayerObj = playerObjs.realPlayerObj;
const computerPlayerObj = playerObjs.computerPlayerObj;
const boatPlacementContainer = document.querySelector(
  "[data-container='boat-placement']",
);
const boatContainersArr = Array.from(
  document.querySelectorAll("[data-container='boat']"),
);
const messageBanner = document.querySelector("[data-container='banner']");
const playerDiv = document.querySelector("[data-board='player']");
const computerDiv = document.querySelector("[data-board='computer']");
const startScreen = document.querySelector("[data-modal='start-screen']");
const startScreenBoard = document.querySelector("[data-board='start-screen']");
const usernameAndButtonContainer = document.querySelector(
  "[data-container='username-and-button']",
);
const winnerScreen = document.querySelector("[data-modal='winner-screen']");
const winnerHeader = document.querySelector("[data-winner-header]");
const modalButton = document.querySelector("[data-modal-button]");

let currentBoat = {
  direction: "horizontal",
  name: "",
  length: 0,
  row: 0,
  column: 0,
};

const setCurrentBoatToDefault = () => {
  currentBoat.direction = "horizontal";
  currentBoat.name = "";
  currentBoat.length = 0;
  currentBoat.row = 0;
  currentBoat.column = 0;
};

const rows = startScreenBoard.children;

// Handle Boat Selection
const selectBoat = (boatElement) => {
  boatElement.classList.remove("hover-effect");
  boatElement.classList.add("selected");

  currentBoat.name = boatElement.dataset.boatName;
  currentBoat.length = +boatElement.dataset.boatLength;
};

const toggleAxisButton = (button) => {
  if (currentBoat.direction === "horizontal") {
    button.textContent = "Vertical Axis";
    currentBoat.direction = "vertical";
  } else if (currentBoat.direction === "vertical") {
    button.textContent = "Horizontal Axis";
    currentBoat.direction = "horizontal";
  }
};

const checkForAlreadySelectedBoat = () => {
  const alreadySelectedBoat = boatContainersArr.find((boatContainer) =>
    boatContainer.classList.contains("selected"),
  );

  if (alreadySelectedBoat !== undefined) {
    alreadySelectedBoat.classList.remove("selected");
    alreadySelectedBoat.classList.add("hover-effect");
  }
};

const handleBoatContainerClick = (event) => {
  const closestContainer = event.target.closest("[data-container]");

  if (closestContainer.dataset.container === "boat") {
    checkForAlreadySelectedBoat();
    selectBoat(closestContainer);
  } else if (closestContainer.dataset.container === "axis-button") {
    const axisButton = closestContainer.querySelector("[data-button]");
    toggleAxisButton(axisButton);
  }
};

boatPlacementContainer.addEventListener("click", (event) =>
  handleBoatContainerClick(event),
);

/************************ */

// Handle Boat Placement on Screen Board:
const getTargetColumns = () => {
  let targetRow = rows[currentBoat.row];
  let columns = targetRow.children;
  let targetColumn = columns[currentBoat.column];
  const finalTargetColumns = [];

  if (currentBoat.direction === "horizontal") {
    for (let i = 0; i < currentBoat.length; i++) {
      targetColumn = columns[currentBoat.column + i];
      finalTargetColumns.push(targetColumn);
    }
  } else if (currentBoat.direction === "vertical") {
    for (let i = 0; i < currentBoat.length; i++) {
      targetRow = rows[currentBoat.row + i];
      if (targetRow === undefined) {
        finalTargetColumns.push(targetRow);
      } else {
        columns = targetRow.children;
        targetColumn = columns[currentBoat.column];
        finalTargetColumns.push(targetColumn);
      }
    }
  }

  return finalTargetColumns;
};

const checkForUndefinedAndRemovePointerClass = (targetColumnsArr) => {
  const checkForUndefined = targetColumnsArr.some(
    (column) => column === undefined,
  );

  if (checkForUndefined === true) return true;

  const checkForRemovePointer = targetColumnsArr.some((column) =>
    column.classList.contains("remove-pointer"),
  );

  if (checkForRemovePointer === true) return true;

  return false;
};

const highlightColumns = (targetColumnsArr) => {
  targetColumnsArr.forEach((column) => column.classList.add("highlight"));
};

const handleHoverAddHighlight = (event) => {
  if (event.target.dataset.board === "start-screen") return;

  currentBoat.row = +event.target.closest("[data-row]").dataset.row;
  currentBoat.column = +event.target.dataset.column;

  const targetColumns = getTargetColumns();
  const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);

  if (checkResult === true) return;

  highlightColumns(targetColumns);
};

const removeHighlightSetColsAndRowsToNull = (targetColumnsArr) => {
  targetColumnsArr.forEach((column) => column.classList.remove("highlight"));
  currentBoat.row = null;
  currentBoat.column = null;
};

const handleHoverRemoveHighlight = (event) => {
  if (event.target.dataset.board === "start-screen") return;

  currentBoat.row = +event.target.closest("[data-row]").dataset.row;

  const targetColumns = getTargetColumns();

  const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);
  if (checkResult === true) return;

  removeHighlightSetColsAndRowsToNull(targetColumns);
};

const placeBoatInPlayerArr = () => {
  realPlayerObj.gameMechanics.placeShip(
    Ship(currentBoat.name, currentBoat.length),
    currentBoat.row,
    currentBoat.column,
    currentBoat.direction,
  );
};

const highlightColumnsAddRemovePointer = (targetColumnsArr) => {
  targetColumnsArr.forEach((column) => {
    column.classList.add("disabled", "remove-pointer");
  });
};

const disableBoatContainer = () => {
  const currentBoatContainer = boatContainersArr.find((container) =>
    container.classList.contains("selected"),
  );

  currentBoatContainer.classList.remove("selected");
  currentBoatContainer.classList.add("disabled");
};

/****************************/
/* Computer Boat Placement */
/**************************/

const addRandomDirectionToCurrentBoat = () => {
  const directionList = ["horizontal", "vertical"];
  const randomStrIndex = Math.floor(Math.random() * directionList.length);

  const randomDirection = directionList[randomStrIndex];
  currentBoat.direction = randomDirection;
};

const randomNumBasedOnBoatLength = () => {
  if (currentBoat.length === 5) {
    return Math.floor(Math.random() * 6);
  } else if (currentBoat.length === 4) {
    return Math.floor(Math.random() * 7);
  } else if (currentBoat.length === 3) {
    return Math.floor(Math.random() * 8);
  } else if (currentBoat.length === 2) {
    return Math.floor(Math.random() * 9);
  }
};

const handleRowAndColumn = () => {
  if (currentBoat.direction === "horizontal") {
    currentBoat.row = Math.floor(Math.random() * 10);
    currentBoat.column = randomNumBasedOnBoatLength();
  } else if (currentBoat.direction === "vertical") {
    currentBoat.row = randomNumBasedOnBoatLength();
    currentBoat.column = Math.floor(Math.random() * 10);
  }
};

const checkRowsAndColumnsForOverlap = () => {
  const computerBoardArr = computerPlayerObj.gameMechanics.board;
  const targetColsArr = getTargetColumns();

  const trueOrFalseArr = [];

  targetColsArr.forEach((col) => {
    const row = col.closest("[data-row]").dataset.row;
    const column = col.dataset.column;

    if (computerBoardArr[row][column] !== null) {
      trueOrFalseArr.push(true);
    } else trueOrFalseArr.push(false);
  });

  const foundTrue = trueOrFalseArr.find((boolean) => boolean === true);

  if (foundTrue === true) {
    return true;
  } else return false;
};

const placeBoatInComputerArr = () => {
  computerPlayerObj.gameMechanics.placeShip(
    Ship(currentBoat.name, currentBoat.length),
    currentBoat.row,
    currentBoat.column,
    currentBoat.direction,
  );
};

const handleBoatInComputerArr = () => {
  addRandomDirectionToCurrentBoat();
  handleRowAndColumn();
  const result = checkRowsAndColumnsForOverlap();
  if (result === true) handleBoatInComputerArr();
  placeBoatInComputerArr();
};

const handleClickBoatSelectHighlight = () => {
  if (currentBoat.name === "") return;

  const targetColumns = getTargetColumns();

  const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);
  if (checkResult === true) return;

  placeBoatInPlayerArr();
  handleBoatInComputerArr();
  highlightColumnsAddRemovePointer(targetColumns);
  disableBoatContainer();
  setCurrentBoatToDefault();
};

startScreenBoard.addEventListener("mouseover", (event) => {
  handleHoverAddHighlight(event);
});

startScreenBoard.addEventListener("mouseout", (event) => {
  handleHoverRemoveHighlight(event);
});

startScreenBoard.addEventListener("click", () => {
  handleClickBoatSelectHighlight();
});

/*************************/

// Username Input
const handleInput = (event) => {
  const inputValue = event.target.value;
  realPlayerObj.name = inputValue;
};

const usernameInput = usernameAndButtonContainer.querySelector(
  "[data-input='username']",
);

usernameInput.addEventListener("change", (event) => handleInput(event));

/*************************/

// Start Battle Button

const checkForAllBoatsPlaced = () => {
  const result = boatContainersArr.every((boatContainer) =>
    boatContainer.classList.contains("disabled"),
  );

  return result;
};

const checkForPlayerNamePlacement = () => {
  if (realPlayerObj.name === undefined) return false;
  else return true;
};

const checkForErrorTag = () => {
  const result = document.querySelector("[data-tag='error']");
  return result;
};

const insertErrorParagraphTag = () => {
  const checkResult = checkForErrorTag();

  if (checkResult !== null) return;

  const errorParagraphTag = document.createElement("p");
  errorParagraphTag.textContent =
    "⚠️ Please enter your name and place all 5 of your ships!";

  errorParagraphTag.id = "error-tag";
  errorParagraphTag.dataset.tag = "error";

  usernameAndButtonContainer.insertBefore(errorParagraphTag, startGameButton);
};

const handleStartButtonClick = () => {
  const boatPlacementResult = checkForAllBoatsPlaced();
  const playerNamePlacement = checkForPlayerNamePlacement();

  if (boatPlacementResult === false || playerNamePlacement === false) {
    insertErrorParagraphTag();
  } else {
    startScreen.close();
    messageBanner.textContent = `${realPlayerObj.name} starts the game!`;
    RenderToDom();
  }
};

const startGameButton = usernameAndButtonContainer.querySelector(
  "[data-button='start-game']",
);

startGameButton.addEventListener("click", () => handleStartButtonClick());

/*************************/

// Open Start Screen
const openStartScreen = () => {
  startScreen.showModal();
  addRowsAndColumns(
    playerObjs.realPlayerObj.gameMechanics.board,
    startScreenBoard,
  );
};

/******************************* */
/* Start Screen From Here Up ^ */
/****************************** */

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
  boardColumn.classList.add("remove-pointer");
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
  const competitorBoard = div.dataset.board;

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
      } else if (board[i][j] !== null && competitorBoard !== "computer") {
        boardColumn.classList.add("highlight");
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
addButtonFunctionality();
