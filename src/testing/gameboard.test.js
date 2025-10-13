import { Gameboard } from "../modules/gameboard";
import { Ship } from "../modules/ship";

const patrolBoat = Ship(2);
const submarineBoat = Ship(3);
const destroyerBoat = Ship(3);
const battleshipBoat = Ship(4);
const carrierBoat = Ship(5);

// ********** Return Boat Coordinates: ************ //

// Patrol:
test("this should return the patrolBoat's coordinates", () => {
  expect(Gameboard().placeShip(patrolBoat, 0, 0, "horizontal")).toEqual([
    [0, 0],
    [0, 1],
  ]);
});

test("this should return the patrolBoat's coordinates", () => {
  expect(Gameboard().placeShip(patrolBoat, 0, 0, "vertical")).toEqual([
    [0, 0],
    [1, 0],
  ]);
});

// Submarine:
test("this should return the submarineBoat's coordinates", () => {
  expect(Gameboard().placeShip(submarineBoat, 0, 0, "horizontal")).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

test("this should return the submarineBoat's coordinates", () => {
  expect(Gameboard().placeShip(submarineBoat, 0, 0, "vertical")).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});

// Destroyer:
test("this should return the destroyerBoat's coordinates", () => {
  expect(Gameboard().placeShip(destroyerBoat, 0, 0, "horizontal")).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

test("this should return the destroyerBoat's coordinates", () => {
  expect(Gameboard().placeShip(destroyerBoat, 0, 0, "vertical")).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});

// Battleship:
test("this should return the battleshipBoat's coordinates", () => {
  expect(Gameboard().placeShip(battleshipBoat, 0, 0, "horizontal")).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
});

test("this should return the battleshipBoat's coordinates", () => {
  expect(Gameboard().placeShip(battleshipBoat, 0, 0, "vertical")).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
});

// Carrier:
test("this should return the carrierBoat's coordinates", () => {
  expect(Gameboard().placeShip(carrierBoat, 0, 0, "horizontal")).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test("this should return the carrierBoat's coordinates", () => {
  expect(Gameboard().placeShip(carrierBoat, 0, 0, "vertical")).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ]);
});

// ******************************** //
// ** Testing for Negative Nums ** //
// ****************************** //

// Patrol
test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(patrolBoat, 0, -1, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(patrolBoat, -1, 0, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

// Submarine
test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(submarineBoat, 0, -1, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(submarineBoat, -1, 0, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

// Destroyer:
test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(destroyerBoat, -1, 0, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(destroyerBoat, 0, -1, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

// Battleship:
test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(battleshipBoat, -1, 0, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(battleshipBoat, 0, -1, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

// Carrier:
test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(carrierBoat, -1, 0, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

test("this should return an error, as starting nums cannot be negative", () => {
  expect(Gameboard().placeShip(carrierBoat, 0, -1, "horizontal")).toBe(
    "Starting number cannot be negative",
  );
});

// ************************ //
// *** Can't Exceed 10 *** //
// ********************** //

// Patrol:
test("this should return an error, as patrolBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(patrolBoat, 0, 9, "horizontal")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

test("this should return an error, as patrolBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(patrolBoat, 9, 0, "vertical")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

// Submarine:
test("this should return an error, as submarineBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(submarineBoat, 0, 8, "horizontal")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

test("this should return an error, as submarineBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(submarineBoat, 8, 0, "vertical")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

// Destroyer:
test("this should return an error, as destroyerBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(destroyerBoat, 0, 8, "horizontal")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

test("this should return an error, as destroyerBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(destroyerBoat, 8, 0, "vertical")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

// Battleship:
test("this should return an error, as battleshipBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(battleshipBoat, 0, 7, "horizontal")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

test("this should return an error, as battleshipBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(battleshipBoat, 7, 0, "vertical")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

// Carrier:
test("this should return an error, as carrierBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(carrierBoat, 0, 6, "horizontal")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});

test("this should return an error, as carrierBoat should not be placed outside board", () => {
  expect(Gameboard().placeShip(carrierBoat, 6, 0, "vertical")).toBe(
    "Boat cannot be placed outside of gameboard",
  );
});
