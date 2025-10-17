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

  /*
  Boats:
  cB = carrierBoat | size = 5
  bB = battleshipBoat | size = 4
  dB = destroyerBoat | size = 3
  sB = submarineBoat | size = 3
  pb = patrolBoat | size = 2

  [
  0: [pBoat, pBoat, nulll, nulll, dBoat, dBoat, dBoat, nulll, nulll, nulll,]
  1: [pBoat, nulll, nulll, nulll, dBoat, nulll, nulll, nulll, nulll, nulll,]
  2: [pBoat, nulll, nulll, nulll, dBoat, nulll, nulll, nulll, nulll, nulll,]
  3: [nulll, nulll, nulll, nulll, dBoat, cBoat, cBoat, cBoat, cBoat, cBoat,]
  4: [nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  5: [nulll, nulll, nulll, nulll, bBoat, bBoat, bBoat, bBoat, nulll, cBoat,]
  6: [sBoat, sBoat, sBoat, nulll, bBoat, nulll, nulll, nulll, nulll, cBoat,]
  7: [sBoat, nulll, nulll, nulll, bBoat, nulll, nulll, nulll, nulll, cBoat,]
  8: [sBoat, nulll, nulll, nulll, bBoat, nulll, nulll, nulll, nulll, cBoat,]
  9: [sBoat, nulll, nulll, nulll, bBoat, nulll, nulll, nulll, nulll, cBoat,]
  ]

  */

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
        return "Starting number cannot be negative";
      }

      const overflowResult = checkForOverflow(
        boat,
        startRow,
        startCol,
        direction,
      );
      if (overflowResult === true) {
        return "Boat cannot be placed outside of gameboard";
      }

      const allValuesNull = checkForOccupiedSquares(
        boat,
        startRow,
        startCol,
        direction,
      );

      if (allValuesNull === false) {
        return "These coordinates are occupied by another vessel";
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
    receiveAttack: function (row, col) {
      const target = board[row][col];

      if (target === null) {
        board[row][col] = "missed";
        return "Missed shot!";
      }

      if (typeof target === "object") {
        target.hit();

        const isSunkResult = target.isSunk();
        const allBoatsSank = checkAllBoats();

        if (allBoatsSank === true) {
          return "All boats have been sunk!";
        } else if (isSunkResult === true) {
          return `The ${target.name} boat has been sunk!`;
        } else return `Direct hit to ${target.name} boat!`;
      }
    },
  };
};

/*
  Boats:
  cB = carrierBoat | size = 5
  bB = battleshipBoat | size = 4
  dB = destroyerBoat | size = 3
  sB = submarineBoat | size = 3
  pb = patrolBoat | size = 2

  [      0     1      2       3     4      5      6      7      8      9
  0: [dBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  1: [dBoat, nulll, missd, nulll, nulll, nulll, nulll, nulll, pBoat, nulll,]
  2: [dBoat, nulll, nulll, nulll, nulll, missd, nulll, nulll, pBoat, nulll,]
  3: [nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  4: [nulll, nulll, nulll, sBoat, sBoat, sBoat, nulll, nulll, nulll, missd,]
  5: [nulll, cBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  6: [nulll, cBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  7: [nulll, cBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  8: [nulll, cBoat, nulll, nulll, nulll, nulll, nulll, nulll, nulll, nulll,]
  9: [nulll, cBoat, nulll, nulll, nulll, nulll, bBoat, bBoat, bBoat, bBoat,]
  ]

  */
