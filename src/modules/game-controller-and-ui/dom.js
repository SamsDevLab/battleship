import { Ship } from "../game/ship.js";
import { GameController } from "../game/game-controller.js";

// const gameController = GameController();
let playerObjs;
let realPlayerObj;
let computerPlayerObj;

// playerObjs = gameController.initGame();
// realPlayerObj = playerObjs.realPlayerObj;
// computerPlayerObj = playerObjs.computerPlayerObj;

// New Location for all DOM queries = dom-helpers.js

// const boatPlacementContainer = document.querySelector(
//   "[data-container='boat-placement']",
// );
// const boatContainersArr = Array.from(
//   document.querySelectorAll("[data-container='boat']"),
// );
// const messageBanner = document.querySelector("[data-container='banner']");
// const playerDiv = document.querySelector("[data-board='player']");
// const computerDiv = document.querySelector("[data-board='computer']");
// const startScreen = document.querySelector("[data-modal='start-screen']");
// const startScreenBoard = document.querySelector("[data-board='start-screen']");
// const usernameAndButtonContainer = document.querySelector(
//   "[data-container='username-and-button']",
// );
// let usernameInput = usernameAndButtonContainer.querySelector(
//   "[data-input='username']",
// );

// const winnerScreen = document.querySelector("[data-modal='winner-screen']");
// const winnerHeader = document.querySelector("[data-winner-header]");
// const playAgainButton = document.querySelector(
//   "[data-modal-button='play-again']",
// );

// New Location: ui-state.js
// let currentBoat = {
//   direction: "horizontal",
//   name: "",
//   length: 0,
//   row: 0,
//   column: 0,
// };

// New Location: ui-state.js
// const setCurrentBoatToDefault = () => {
//   currentBoat.direction = "horizontal";
//   currentBoat.name = "";
//   currentBoat.length = 0;
//   currentBoat.row = 0;
//   currentBoat.column = 0;
// };

const rows = startScreenBoard.children;

// New Location: boat-placement-ui.js
// Handle Boat Selection
// const selectBoat = (boatElement) => {
//   boatElement.classList.remove("hover-effect");
//   boatElement.classList.add("selected");

//   currentBoat.name = boatElement.dataset.boatName;
//   currentBoat.length = +boatElement.dataset.boatLength;
// };

// New Location: boat-placement-ui.js
// const toggleAxisButton = (button) => {
//   if (currentBoat.direction === "horizontal") {
//     button.textContent = "Vertical Axis";
//     currentBoat.direction = "vertical";
//   } else if (currentBoat.direction === "vertical") {
//     button.textContent = "Horizontal Axis";
//     currentBoat.direction = "horizontal";
//   }
// };

// New Location: boat-placement-ui.js
// const checkForAlreadySelectedBoat = () => {
//   const alreadySelectedBoat = boatContainersArr.find((boatContainer) =>
//     boatContainer.classList.contains("selected"),
//   );

//   if (alreadySelectedBoat !== undefined) {
//     alreadySelectedBoat.classList.remove("selected");
//     alreadySelectedBoat.classList.add("hover-effect");
//   }
// };

// New Location: boat-placement-ui.js
// const handleBoatContainerClick = (event) => {
//   const closestContainer = event.target.closest("[data-container]");

//   if (closestContainer.dataset.container === "boat") {
//     checkForAlreadySelectedBoat();
//     selectBoat(closestContainer);
//   } else if (closestContainer.dataset.container === "axis-button") {
//     const axisButton = closestContainer.querySelector("[data-button]");
//     toggleAxisButton(axisButton);
//   }
// };

// New Location: event.js
// boatPlacementContainer.addEventListener("click", (event) =>
//   handleBoatContainerClick(event),
// );

/************************ */

// New Location: boat-placement-ui.js
// Handle Boat Placement on Screen Board:
// const getTargetColumns = () => {
//   let targetRow = rows[currentBoat.row];
//   let columns = targetRow.children;
//   let targetColumn = columns[currentBoat.column];
//   const finalTargetColumns = [];

//   if (currentBoat.direction === "horizontal") {
//     for (let i = 0; i < currentBoat.length; i++) {
//       targetColumn = columns[currentBoat.column + i];
//       finalTargetColumns.push(targetColumn);
//     }
//   } else if (currentBoat.direction === "vertical") {
//     for (let i = 0; i < currentBoat.length; i++) {
//       targetRow = rows[currentBoat.row + i];
//       if (targetRow === undefined) {
//         finalTargetColumns.push(targetRow);
//       } else {
//         columns = targetRow.children;
//         targetColumn = columns[currentBoat.column];
//         finalTargetColumns.push(targetColumn);
//       }
//     }
//   }

//   return finalTargetColumns;
// };

// New Location: boat-placement-ui.js
// const checkForUndefinedAndRemovePointerClass = (targetColumnsArr) => {
//   const checkForUndefined = targetColumnsArr.some(
//     (column) => column === undefined,
//   );

//   if (checkForUndefined === true) return true;

//   const checkForRemovePointer = targetColumnsArr.some((column) =>
//     column.classList.contains("remove-pointer"),
//   );

//   if (checkForRemovePointer === true) return true;

//   return false;
// };

// New Location: boat-placement-ui.js
// const highlightColumns = (targetColumnsArr) => {
//   targetColumnsArr.forEach((column) => column.classList.add("highlight"));
// };

// New Location: boat-placement-ui.js
// const handleHoverAddHighlight = (event) => {
//   if (event.target.dataset.board === "start-screen") return;

// New Location: boat-placement-ui.js
//   currentBoat.row = +event.target.closest("[data-row]").dataset.row;
//   currentBoat.column = +event.target.dataset.column;

// New Location: boat-placement-ui.js
//   const targetColumns = getTargetColumns();
//   const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);

//   if (checkResult === true) return;

//   highlightColumns(targetColumns);
// };

// New Location: boat-placement-ui.js
// const removeHighlightSetColsAndRowsToNull = (targetColumnsArr) => {
//   targetColumnsArr.forEach((column) => column.classList.remove("highlight"));
//   currentBoat.row = null;
//   currentBoat.column = null;
// };

// New Location: boat-placement-ui.js
// const handleHoverRemoveHighlight = (event) => {
//   if (event.target.dataset.board === "start-screen") return;

//   currentBoat.row = +event.target.closest("[data-row]").dataset.row;

//   const targetColumns = getTargetColumns();

//   const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);
//   if (checkResult === true) return;

//   removeHighlightSetColsAndRowsToNull(targetColumns);
// };

// Start here when you return from break. You were migrating this to the game-controller
const placeBoatInPlayerArr = () => {
  realPlayerObj.gameMechanics.placeShip(
    Ship(currentBoat.name, currentBoat.length),
    currentBoat.row,
    currentBoat.column,
    currentBoat.direction,
  );
};

// New Location: boat-placement-ui.js
// const highlightColumnsAddRemovePointer = (targetColumnsArr) => {
//   targetColumnsArr.forEach((column) => {
//     column.classList.add("disabled");
//     column.classList.add("remove-pointer");
//   });
// };

// New Location: boat-placement-ui.js
// const disableBoatContainer = () => {
//   const currentBoatContainer = boatContainersArr.find((container) =>
//     container.classList.contains("selected"),
//   );

//   currentBoatContainer.classList.remove("selected");
//   currentBoatContainer.classList.add("disabled");
// };

/****************************/
/* Computer Boat Placement */
/**************************/

// New Location: ai-boat-placement.js
// const addRandomDirectionToCurrentBoat = () => {
//   const directionList = ["horizontal", "vertical"];
//   const randomStrIndex = Math.floor(Math.random() * directionList.length);

//   const randomDirection = directionList[randomStrIndex];
//   currentBoat.direction = randomDirection;
// };

// New Location: ai-boat-placement.js
// const randomNumBasedOnBoatLength = () => {
//   if (currentBoat.length === 5) {
//     return Math.floor(Math.random() * 6);
//   } else if (currentBoat.length === 4) {
//     return Math.floor(Math.random() * 7);
//   } else if (currentBoat.length === 3) {
//     return Math.floor(Math.random() * 8);
//   } else if (currentBoat.length === 2) {
//     return Math.floor(Math.random() * 9);
//   }
// };

// New Location: ai-boat-placement.js
// const handleRowAndColumn = () => {
//   if (currentBoat.direction === "horizontal") {
//     currentBoat.row = Math.floor(Math.random() * 10);
//     currentBoat.column = randomNumBasedOnBoatLength();
//   } else if (currentBoat.direction === "vertical") {
//     currentBoat.row = randomNumBasedOnBoatLength();
//     currentBoat.column = Math.floor(Math.random() * 10);
//   }
// };

// New Location: ai-boat-placement.js
// const checkRowsAndColumnsForOverlap = () => {
//   const computerBoardArr = computerPlayerObj.gameMechanics.board;
//   const targetColsArr = getTargetColumns();

//   const trueOrFalseArr = [];

//   targetColsArr.forEach((col) => {
//     const row = col.closest("[data-row]").dataset.row;
//     const column = col.dataset.column;

//     if (computerBoardArr[row][column] !== null) {
//       trueOrFalseArr.push(true);
//     } else trueOrFalseArr.push(false);
//   });

//   const foundTrue = trueOrFalseArr.find((boolean) => boolean === true);

//   if (foundTrue === true) {
//     return true;
//   } else return false;
// };

// New Location: ai-boat-placement.js
// const placeBoatInComputerArr = () => {
//   computerPlayerObj.gameMechanics.placeShip(
//     Ship(currentBoat.name, currentBoat.length),
//     currentBoat.row,
//     currentBoat.column,
//     currentBoat.direction,
//   );
// };

// New Location: ai-boat-placement.js
// const handleBoatInComputerArr = () => {
//   addRandomDirectionToCurrentBoat();
//   handleRowAndColumn();
//   const result = checkRowsAndColumnsForOverlap();
//   if (result === true) handleBoatInComputerArr();
//   placeBoatInComputerArr();
// };

// New Location: boat-placement-ui.js
// const handleClickBoatSelectHighlight = () => {
//   if (currentBoat.name === "") return;

//   const targetColumns = getTargetColumns();

//   const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);
//   if (checkResult === true) return;

//   placeBoatInPlayerArr();
//   handleBoatInComputerArr();
//   highlightColumnsAddRemovePointer(targetColumns);
//   disableBoatContainer();
//   setCurrentBoatToDefault();
// };

// New Location: event.js
// startScreenBoard.addEventListener("mouseover", (event) => {
//   handleHoverAddHighlight(event);
// });

// New Location: event.js
// startScreenBoard.addEventListener("mouseout", (event) => {
//   handleHoverRemoveHighlight(event);
// });

// New Location: event.js
// startScreenBoard.addEventListener("click", () => {
//   handleClickBoatSelectHighlight();
// });

/*************************/

// New Location: boat-placement-ui.js
// Username Input
// const handleInput = (event) => {
//   const inputValue = event.target.value;
//   realPlayerObj.name = inputValue;
// };

// New Location: event.js
// usernameInput.addEventListener("change", (event) => handleInput(event));

/*************************/

// Start Battle Button

// New Location: boat-placement-ui.js
// const checkForAllBoatsPlaced = () => {
//   const result = boatContainersArr.every((boatContainer) =>
//     boatContainer.classList.contains("disabled"),
//   );

//   return result;
// };

// New Location: boat-placement-ui.js
// const checkForPlayerNamePlacement = () => {
//   if (realPlayerObj.name === undefined) return false;
//   else return true;
// };

// New Location: boat-placement-ui.js
// const checkForErrorTag = () => {
//   const result = document.querySelector("[data-tag='error']");
//   return result;
// };

// New Location: boat-placement-ui.js
// const insertErrorParagraphTag = () => {
//   const checkResult = checkForErrorTag();

//   if (checkResult !== null) return;

//   const errorParagraphTag = document.createElement("p");
//   errorParagraphTag.textContent =
//     "⚠️ Please enter your name and place all 5 of your ships!";

//   errorParagraphTag.id = "error-tag";
//   errorParagraphTag.dataset.tag = "error";

//   usernameAndButtonContainer.insertBefore(errorParagraphTag, startGameButton);
// };

// New Location: boat-placement-ui.js
// const handleStartButtonClick = () => {
//   const boatPlacementResult = checkForAllBoatsPlaced();
//   const playerNamePlacement = checkForPlayerNamePlacement();

//   if (boatPlacementResult === false || playerNamePlacement === false) {
//     insertErrorParagraphTag();
//   } else {
//     startScreen.classList.remove("is-open");
//     startScreen.close();
//     messageBanner.textContent = `${realPlayerObj.name} shoots first!`;
//     RenderToDom();
//   }
// };

// const startGameButton = usernameAndButtonContainer.querySelector(
//   "[data-button='start-game']",
// );

// startGameButton.addEventListener("click", () => handleStartButtonClick());

/*************************/
// New Location: renderer.js
// Open Start Screen
// const openStartScreen = (realPlayerBoard, screenBoard) => {
//   startScreen.classList.add("is-open");
//   startScreen.showModal();
//   screenBoard.replaceChildren();
//   addRowsAndColumns(realPlayerBoard, screenBoard);
// };

/******************************* */
/* Start Screen From Here Up ^ */
/****************************** */

const announceWinner = (winnerObj) => {
  winnerScreen.classList.add("show-winner");
  winnerScreen.showModal();
  winnerHeader.textContent = `${winnerObj.name} wins the game!`;
};

const resetGameBoards = () => {
  playerDiv.replaceChildren();
  computerDiv.replaceChildren();
};

const resetPlayerObjs = () => {
  playerObjs = null;
  playerObjs = gameController.initGame();
  realPlayerObj = playerObjs.realPlayerObj;
  computerPlayerObj = playerObjs.computerPlayerObj;
};

const resetBoatContainers = () => {
  boatContainersArr.forEach((boatContainer) => {
    boatContainer.classList.remove("disabled");
    boatContainer.classList.add("hover-effect");
  });
};

const resetStartScreenColumns = () => {
  const highlightedColumns = Array.from(
    startScreenBoard.querySelectorAll(".highlight"),
  );
  highlightedColumns.forEach((column) => {
    column.classList.remove("highlight");
    column.classList.remove("disabled");
  });
};

const resetUsernameInput = () => {
  usernameInput.value = "";
};

const resetIncompleteWarning = () => {
  const errorTag = document.querySelector("[data-tag='error']");
  if (errorTag === null) {
    return;
  } else errorTag.remove();
};

const handleGameReset = () => {
  winnerScreen.classList.remove("show-winner");
  winnerScreen.close();
  resetGameBoards();
  resetPlayerObjs();
  resetBoatContainers();
  resetStartScreenColumns();
  resetUsernameInput();
  resetIncompleteWarning();
  openStartScreen(realPlayerObj.gameMechanics.board, startScreenBoard);
};

playAgainButton.addEventListener("click", () => {
  handleGameReset();
});

// New Location: renderer.js
// const markPreviousAttackOnBoard = (attack, boardColumn) => {
//   const markAttackSpan = document.createElement("span");
//   markAttackSpan.classList.add(`${attack}-circle`);
//   boardColumn.dataset.hitOrMiss = `${attack}`;
//   boardColumn.append(markAttackSpan);
//   boardColumn.classList.add("remove-pointer");
// };

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

// New location: renderer.js
// const addRowsAndColumns = (board, div) => {
//   const competitorBoard = div.dataset.board;

//   for (let i = 0; i < board.length; i++) {
//     const boardRow = document.createElement("div");
//     boardRow.classList.add("row");
//     boardRow.dataset.row = `${i}`;
//     div.append(boardRow);

//     for (let j = 0; j < board.length; j++) {
//       const boardColumn = document.createElement("button");
//       boardColumn.classList.add("column");
//       boardColumn.dataset.column = `${j}`;

//       if (board[i][j] === "missed" || board[i][j] === "hit") {
//         markPreviousAttackOnBoard(board[i][j], boardColumn);
//       } else if (board[i][j] !== null && competitorBoard !== "computer") {
//         boardColumn.classList.add("highlight");
//       }
//       boardRow.append(boardColumn);
//     }
//   }
// };

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

// openStartScreen(realPlayerObj.gameMechanics.board, startScreenBoard);
addButtonFunctionality();
