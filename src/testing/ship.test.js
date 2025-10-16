import { Ship } from "../modules/game-rules-and-logic/index";

// game-rules-and-logic

const newShip = Ship(2);

test("this should increase the numOfHits by 1", () => {
  expect(newShip.hit()).toBe(1);
});

test("this should increase the numOfHits by 1", () => {
  expect(newShip.hit()).toBe(2);
});
