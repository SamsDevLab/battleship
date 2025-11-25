export const ComputerBoatPlacement = (state, domHelpers) => {
  const addRandomDirectionToCurrentBoat = () => {
    const directionList = ["horizontal", "vertical"];
    const randomStrIndex = Math.floor(Math.random() * directionList.length);

    const randomDirection = directionList[randomStrIndex];
    state.setCurrentBoatDirection(randomDirection);
  };

  const randomNumBasedOnBoatLength = (currentBoat) => {
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

  const handleRowAndColumn = (currentBoat) => {
    if (currentBoat.direction === "horizontal") {
      state.setCurrentBoatRow(Math.floor(Math.random() * 10));
      state.setCurrentBoatColumn(randomNumBasedOnBoatLength(currentBoat));
    } else if (currentBoat.direction === "vertical") {
      state.setCurrentBoatRow(randomNumBasedOnBoatLength(currentBoat));
      state.setCurrentBoatColumn(Math.floor(Math.random() * 10));
    }
  };

  const getTargetColumns = () => {
    const currentBoat = state.getCurrentBoat();
    const rows = domHelpers.startScreenBoard.children;
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

  const checkRowsAndColumnsForOverlap = () => {
    const computerPlayer = state.getComputerPlayer();
    const computerBoardArr = computerPlayer.gameMechanics.board;
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

  return {
    handleBoatInComputerArr: function (computerBoatPlacement, gameController) {
      const currentBoat = state.getCurrentBoat();
      addRandomDirectionToCurrentBoat();
      handleRowAndColumn(currentBoat);
      const result = checkRowsAndColumnsForOverlap();
      if (result === true)
        computerBoatPlacement.handleBoatInComputerArr(
          computerBoatPlacement,
          gameController,
        );
      gameController.placeBoatInComputerArr(state);
    },
  };
};
