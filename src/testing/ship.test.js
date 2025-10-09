import { ship } from "../modules/ship.js";

const newShip = ship(2, 0, false);

// test("this should increase the numOfHits by 1", () => {
//   expect(newShip.hit()).toBe(0);
// });

test("this should increase the numOfHits by 1", () => {
  expect(newShip.hit()).toBe(1);
});

test("this should increase the numOfHits by 1", () => {
  expect(newShip.hit()).toBe(2);
});

// test("this should increase the numOfHits by 1", () => {
//   expect(newShip.hit()).toBe(3);
// });

test("this should report that the Destroyer has been sunk", () => {
  expect(newShip.isSunk()).toBe("The vessel has been sunk!");
});
