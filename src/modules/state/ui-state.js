export const State = () => {
  let currentBoat = {
    direction: "horizontal",
    name: "",
    length: 0,
    row: 0,
    column: 0,
  };
  return {
    currentBoat,
    setCurrentBoatToDefault: function () {
      currentBoat.direction = "horizontal";
      currentBoat.name = "";
      currentBoat.length = 0;
      currentBoat.row = 0;
      currentBoat.column = 0;
    },
  };
};
