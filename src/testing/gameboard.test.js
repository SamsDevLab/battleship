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

// Carrier
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

// ****************************** //

// test("this should return an error, as starting nums cannot be negative", () => {
//   expect(Gameboard().placeShip(patrolBoat, 0, -1, "horizontal")).toBe(
//     "Starting number cannot be negative",
//   );
// });

// test("this should return an error, as starting nums cannot be negative", () => {
//   expect(Gameboard().placeShip(patrolBoat, -1, 0, "horizontal")).toBe(
//     "Starting number cannot be negative",
//   );
// });

// test("this should return an error, as numbers cannot be placed outside of board", () => {
//   expect(Gameboard().placeShip(patrolBoat, , 0, "horizontal")).toBe(
//     "Starting number cannot be negative",
//   );
// });
