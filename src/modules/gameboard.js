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
  0: [pBoat, pBoat, null, null, null, null, null, null, null, pBoat,]
  1: [null, null, null, null, null, null, null, null, null, null,]
  2: [null, null, null, null, null, null, null, null, null, null,]
  3: [null, null, null, null, null, null, null, null, null, null,]
  4: [null, null, null, null, null, null, null, null, null, null,]
  5: [null, null, null, null, null, null, null, null, null, null,]
  6: [null, null, null, null, null, null, null, null, null, null,]
  7: [null, null, null, null, null, null, null, null, null, null,]
  8: [null, null, null, null, null, null, null, null, null, null,]
  9: [null, null, null, null, null, null, null, null, null, null,]
  ]

  Pseudo:
  • If 'direction' is horizontal, boat's length spreads across row
  • If 'direction' is vertical, boat's length spreads across column

  */

  const checkForOverFlow = (boat, startRow, startCol) => {
    if (startRow + boat.length > rows || startCol + boat.length > columns) {
      return true;
    } else return false;
  };

  return {
    placeShip: function (boat, startRow, startCol, direction) {
      const finalCoords = [];

      if (startRow < 0 || startCol < 0) {
        return "Starting number cannot be negative";
      } else {
        const overflowResult = checkForOverFlow(boat, startRow, startCol);
        if (overflowResult === true) {
          return "Boat cannot be placed outside of gameboard";
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
        }
      }

      return finalCoords;
    },
  };
};
