import { Gameboard } from "../modules/gameboard";
import { Ship } from "../modules/ship";

const patrolBoat = Ship(2);
const submarineBoat = Ship(3);
const destroyerBoat = Ship(3);
const battleshipBoat = Ship(4);
const carrierBoat = Ship(5);

const board = Gameboard();

// ******************************** //
// ** Check For Negative Values ** //
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

// *************************** //
// *** Check for Overflow *** //
// ************************* //

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

// ********************************* //
// *** Return Boat Coordinates: *** //
// ******************************* //

// Patrol:
test("this should return the patrolBoat's coordinates", () => {
  expect(board.placeShip(patrolBoat, 0, 0, "horizontal")).toEqual([
    [0, 0],
    [0, 1],
  ]);
});

test("this should return the patrolBoat's coordinates", () => {
  expect(board.placeShip(patrolBoat, 1, 0, "vertical")).toEqual([
    [1, 0],
    [2, 0],
  ]);
});

// Submarine:
test("this should return the submarineBoat's coordinates", () => {
  expect(board.placeShip(submarineBoat, 6, 0, "horizontal")).toEqual([
    [6, 0],
    [6, 1],
    [6, 2],
  ]);
});

test("this should return the submarineBoat's coordinates", () => {
  expect(board.placeShip(submarineBoat, 7, 0, "vertical")).toEqual([
    [7, 0],
    [8, 0],
    [9, 0],
  ]);
});

// Destroyer:
test("this should return the destroyerBoat's coordinates", () => {
  expect(board.placeShip(destroyerBoat, 0, 4, "horizontal")).toEqual([
    [0, 4],
    [0, 5],
    [0, 6],
  ]);
});

test("this should return the destroyerBoat's coordinates", () => {
  expect(board.placeShip(destroyerBoat, 1, 4, "vertical")).toEqual([
    [1, 4],
    [2, 4],
    [3, 4],
  ]);
});

// Battleship:
test("this should return the battleshipBoat's coordinates", () => {
  expect(board.placeShip(battleshipBoat, 5, 4, "horizontal")).toEqual([
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 7],
  ]);
});

test("this should return the battleshipBoat's coordinates", () => {
  expect(board.placeShip(battleshipBoat, 6, 4, "vertical")).toEqual([
    [6, 4],
    [7, 4],
    [8, 4],
    [9, 4],
  ]);
});

// Carrier:
test("this should return the carrierBoat's coordinates", () => {
  expect(board.placeShip(carrierBoat, 3, 5, "horizontal")).toEqual([
    [3, 5],
    [3, 6],
    [3, 7],
    [3, 8],
    [3, 9],
  ]);
});

test("this should return the carrierBoat's coordinates", () => {
  expect(board.placeShip(carrierBoat, 5, 9, "vertical")).toEqual([
    [5, 9],
    [6, 9],
    [7, 9],
    [8, 9],
    [9, 9],
  ]);
});

// ************************************ //
// *** Check for Occupied Squares: *** //
// ********************************** //

// Patrol:
test("this should return an error announcing patrolBoat cannot be placed at the coords", () => {
  expect(board.placeShip(patrolBoat, 0, 0, "horizontal")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

test("this should return an error announcing patrolBoat cannot be placed at the coords", () => {
  expect(board.placeShip(patrolBoat, 1, 0, "vertical")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

// Submarine:
test("this should return an error announcing submarineBoat cannot be placed at the coords", () => {
  expect(board.placeShip(submarineBoat, 6, 0, "horizontal")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

test("this should return an error announcing submarineBoat cannot be placed at the coords", () => {
  expect(board.placeShip(submarineBoat, 7, 0, "vertical")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

// Destroyer:
test("this should return an error announcing destroyerBoat cannot be placed at the coords", () => {
  expect(board.placeShip(destroyerBoat, 0, 4, "horizontal")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

test("this should return an error announcing destroyerBoat cannot be placed at the coords", () => {
  expect(board.placeShip(destroyerBoat, 1, 4, "vertical")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

// Battleship:
test("this should return an error announcing battleshipBoat cannot be placed at the coords", () => {
  expect(board.placeShip(battleshipBoat, 5, 4, "horizontal")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

test("this should return an error announcing battleshipBoat cannot be placed at the coords", () => {
  expect(board.placeShip(battleshipBoat, 6, 4, "vertical")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

// Carrier:
test("this should return an error announcing carrierBoat cannot be placed at the coords", () => {
  expect(board.placeShip(carrierBoat, 3, 5, "horizontal")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});

test("this should return an error announcing carrierBoat cannot be placed at the coords", () => {
  expect(board.placeShip(carrierBoat, 5, 9, "vertical")).toEqual(
    "These coordinates are occupied by another vessel",
  );
});
