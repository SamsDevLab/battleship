import { Ship } from "../modules/refactor-game/refactor-ship.js";

const newShip = Ship(2);

test("this should increase the numOfHits by 1", () => {
  expect(newShip.hit()).toBe(1);
});

test("this should increase the numOfHits by 1", () => {
  expect(newShip.hit()).toBe(2);
});
