export const State = () => {
  let realPlayer;
  let computerPlayer;
  let currentBoat = {
    direction: "horizontal",
    name: "",
    length: 0,
    row: 0,
    column: 0,
  };
  return {
    getRealPlayer: function () {
      return realPlayer;
    },
    getComputerPlayer: function () {
      return computerPlayer;
    },
    getCurrentBoat: function () {
      return currentBoat;
    },
    storeObjects: function (playerObjs) {
      realPlayer = playerObjs.realPlayerObj;
      computerPlayer = playerObjs.computerPlayer;
    },
    setCurrentBoatToDefault: function () {
      currentBoat.direction = "horizontal";
      currentBoat.name = "";
      currentBoat.length = 0;
      currentBoat.row = 0;
      currentBoat.column = 0;
    },
    setCurrentBoatName: function (name) {
      currentBoat.name = name;
    },
    setCurrentBoatLength: function (length) {
      currentBoat.length = length;
    },
    setCurrentBoatRow: function (row) {
      currentBoat.row = row;
    },
    setCurrentBoatColumn: function (column) {
      currentBoat.column = column;
    },
  };
};
