import { ship } from "../modules/ship.js";

const newShip = ship(5, 0, false);

test("this should increase the numOfHits by 1", () => {
  expect(newShip.hit()).toBe(1);
});
