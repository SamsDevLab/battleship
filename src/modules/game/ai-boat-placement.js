import { GameController } from "../../index.js";
import { State } from "../../index.js";

const gameController = GameController();
const state = State();

/* 
Add getter to:

• handleBoatInComputerArr

Add setter to:
• handleRowAndColumn

*/

export const ComputerBoatPlacement = () => {
  const addRandomDirectionToCurrentBoat = (currentBoat) => {
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

  const handleRowAndColumn = (currentBoat) => {
    if (currentBoat.direction === "horizontal") {
      state.setCurrentBoatRow(Math.floor(Math.random() * 10));
      state.setCurrentBoatColumn(randomNumBasedOnBoatLength(currentBoat));

      // currentBoat.row = Math.floor(Math.random() * 10);
      // currentBoat.column = randomNumBasedOnBoatLength();
    } else if (currentBoat.direction === "vertical") {
      state.setCurrentBoatRow(randomNumBasedOnBoatLength(currentBoat));
      state.setCurrentBoatColumn(Math.floor(Math.random() * 10));

      // currentBoat.row = randomNumBasedOnBoatLength();
      // currentBoat.column = Math.floor(Math.random() * 10);
    }
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

  // const placeBoatInComputerArr = () => {
  //   computerPlayerObj.gameMechanics.placeShip(
  //     Ship(currentBoat.name, currentBoat.length),
  //     currentBoat.row,
  //     currentBoat.column,
  //     currentBoat.direction,
  //   );
  // };

  return {
    handleBoatInComputerArr: function () {
      const currentBoat = state.getCurrentBoat();
      addRandomDirectionToCurrentBoat(currentBoat);
      handleRowAndColumn(currentBoat);
      const result = checkRowsAndColumnsForOverlap();
      if (result === true) ComputerBoatPlacement().handleBoatInComputerArr();
      gameController.placeBoatInComputerArr();
    },
  };
};
