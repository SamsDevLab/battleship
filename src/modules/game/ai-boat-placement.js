export const ComputerBoatPlacement = (state) => {
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

  const checkRowsAndColumnsForOverlap = (getTargetColumns) => {
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
    handleBoatInComputerArr: function (
      getTargetColumns,
      computerBoatPlacement,
      gameController,
    ) {
      const currentBoat = state.getCurrentBoat();
      addRandomDirectionToCurrentBoat();
      handleRowAndColumn(currentBoat);
      const result = checkRowsAndColumnsForOverlap(getTargetColumns);
      if (result === true) computerBoatPlacement.handleBoatInComputerArr();
      gameController.placeBoatInComputerArr(currentBoat);
    },
  };
};
