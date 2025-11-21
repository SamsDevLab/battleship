import { DOMHelpers } from "../../index.js";
import { State } from "../../index.js";
import { ComputerBoatPlacement } from "../../index.js";

const domHelpers = DOMHelpers();
const currentBoat = State().currentBoat;
const computerBoatPlacement = ComputerBoatPlacement();

export const BoatPlacement = () => {
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

  const getTargetColumns = () => {
    const rows = domHelpers.startScreenBoard.children;
    console.log(rows);
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

  const removeHighlightSetColsAndRowsToNull = (targetColumnsArr) => {
    targetColumnsArr.forEach((column) => column.classList.remove("highlight"));
    currentBoat.row = null;
    currentBoat.column = null;
  };

  const highlightColumnsAddRemovePointer = (targetColumnsArr) => {
    targetColumnsArr.forEach((column) => {
      column.classList.add("disabled");
      column.classList.add("remove-pointer");
    });
  };

  const disableBoatContainer = () => {
    const currentBoatContainer = boatContainersArr.find((container) =>
      container.classList.contains("selected"),
    );

    currentBoatContainer.classList.remove("selected");
    currentBoatContainer.classList.add("disabled");
  };

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

  return {
    handleBoatContainerClick: function (event) {
      console.log(event);
      const closestContainer = event.target.closest("[data-container]");

      if (closestContainer.dataset.container === "boat") {
        checkForAlreadySelectedBoat();
        selectBoat(closestContainer);
      } else if (closestContainer.dataset.container === "axis-button") {
        const axisButton = closestContainer.querySelector("[data-button]");
        toggleAxisButton(axisButton);
      }
    },
    handleHoverAddHighlight: function (event) {
      if (event.target.dataset.board === "start-screen") return;

      currentBoat.row = +event.target.closest("[data-row]").dataset.row;
      currentBoat.column = +event.target.dataset.column;

      const targetColumns = getTargetColumns();
      const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);

      if (checkResult === true) return;

      highlightColumns(targetColumns);
    },
    handleHoverRemoveHighlight: function (event) {
      if (event.target.dataset.board === "start-screen") return;

      currentBoat.row = +event.target.closest("[data-row]").dataset.row;

      const targetColumns = getTargetColumns();

      const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);
      if (checkResult === true) return;

      removeHighlightSetColsAndRowsToNull(targetColumns);
    },
    handleClickBoatSelectHighlight: function () {
      if (currentBoat.name === "") return;

      const targetColumns = getTargetColumns();

      const checkResult = checkForUndefinedAndRemovePointerClass(targetColumns);
      if (checkResult === true) return;

      placeBoatInPlayerArr();
      computerBoatPlacement.handleBoatInComputerArr();
      highlightColumnsAddRemovePointer(targetColumns);
      disableBoatContainer();
      setCurrentBoatToDefault();
    },
    handleInput: function (event) {
      const inputValue = event.target.value;
      realPlayerObj.name = inputValue;
    },
    handleStartButtonClick: function () {
      const boatPlacementResult = checkForAllBoatsPlaced();
      const playerNamePlacement = checkForPlayerNamePlacement();

      if (boatPlacementResult === false || playerNamePlacement === false) {
        insertErrorParagraphTag();
      } else {
        startScreen.classList.remove("is-open");
        startScreen.close();
        messageBanner.textContent = `${realPlayerObj.name} shoots first!`;
        RenderToDom();
      }
    },
  };
};
