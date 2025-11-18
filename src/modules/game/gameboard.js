export const Gameboard = () => {
  const board = [];
  const rows = 10;
  const columns = 10;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = null;
    }
  }

  const checkForNegativeValue = (startRow, startCol) => {
    if (startRow < 0 || startCol < 0) {
      return true;
    } else return false;
  };

  const checkForOverflow = (boat, startRow, startCol, direction) => {
    const resultsArr = [];

    if (direction === "horizontal") {
      for (let i = 0; i < boat.length; i++) {
        resultsArr.push(startRow, startCol + i);
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < boat.length; i++) {
        resultsArr.push(startRow + i, startCol);
      }
    }

    const overflow = resultsArr.some((element) => element >= 10);

    return overflow;
  };

  const checkForOccupiedSquares = (boat, startRow, startCol, direction) => {
    const resultsArr = [];

    if (direction === "horizontal") {
      for (let i = 0; i < boat.length; i++) {
        resultsArr.push(board[startRow][startCol + i]);
      }
    }

    if (direction === "vertical") {
      for (let i = 0; i < boat.length; i++) {
        resultsArr.push(board[startRow + i][startCol]);
      }
    }

    const allNull = resultsArr.every((element) => element === null);

    return allNull;
  };

  const checkAllBoats = () => {
    const filteredRowsArr = [];

    board.forEach((row) =>
      row.forEach((element) => {
        if (element !== null && typeof element === "object") {
          filteredRowsArr.push(element);
        }
      }),
    );

    const allBoatsSankStatus = filteredRowsArr.every(
      (element) => element.sinkStatus === true,
    );

    return allBoatsSankStatus;
  };

  return {
    board,
    placeShip: function (boat, startRow, startCol, direction) {
      const finalCoords = [];

      const valueResult = checkForNegativeValue(startRow, startCol);
      if (valueResult === true) {
        return;
      }

      const overflowResult = checkForOverflow(
        boat,
        startRow,
        startCol,
        direction,
      );
      if (overflowResult === true) {
        return;
      }

      const allValuesNull = checkForOccupiedSquares(
        boat,
        startRow,
        startCol,
        direction,
      );

      if (allValuesNull === false) {
        return;
      } else {
        for (let i = 0; i < boat.length; i++) {
          if (direction === "horizontal") {
            board[startRow][startCol + i] = boat;
            finalCoords.push([startRow, startCol + i]);
          } else if (direction === "vertical") {
            board[startRow + i][startCol] = boat;
            finalCoords.push([startRow + i, startCol]);
          }
        }
        return finalCoords;
      }
    },
    receiveAttack: function (row, col, attackerObj) {
      const target = this.board[row][col];

      if (target === null) {
        this.board[row][col] = "missed";
        return `${attackerObj.name} missed!`;
      }

      if (typeof target === "object") {
        target.hit();
        this.board[row][col] = "hit";

        const isSunkResult = target.isSunk();
        const allBoatsSank = checkAllBoats();

        if (allBoatsSank === true) {
          return "All boats have been sunk!";
        } else if (isSunkResult === true) {
          return `${attackerObj.name} has sunk the ${target.name} vessel!`;
        } else return `Direct hit to ${target.name} vessel!`;
      }
    },
  };
};
