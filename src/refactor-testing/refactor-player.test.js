import { Player } from "../modules/refactor-game/refactor-player.js";
import { Ship } from "../modules/refactor-game/refactor-ship.js";

// *************************** //
// *** Test Player Object *** //
// ************************* //

const realPlayer = Player().realPlayer("Sam's Dev Lab");
const realPlayerBoard = realPlayer.board;

test("this test should return the name of the realPlayer object", () => {
  expect(realPlayer.name).toBe("Sam's Dev Lab");
});

test("this test should return the final coordinates of a patrol boat placement", () => {
  expect(
    realPlayerBoard.placeShip(Ship("patrol", 2), 0, 0, "vertical"),
  ).toEqual([
    [0, 0],
    [1, 0],
  ]);
});

test("this test should return notice that patrol boat has been hit", () => {
  expect(realPlayerBoard.receiveAttack(0, 0)).toBe(
    "Direct hit to patrol boat!",
  );
});

test("this test should return notice of a missed shot", () => {
  expect(realPlayerBoard.receiveAttack(1, 1)).toBe("Missed shot!");
});

// ***************************** //
// *** Test Computer Object *** //
// *************************** //

const computerPlayer = Player().computerPlayer();
const computerBoard = computerPlayer.board;

test("this test should return the final coordinates of a boat", () => {
  expect(computerBoard.placeShip(Ship("patrol", 2), 7, 0, "vertical")).toEqual([
    [7, 0],
    [8, 0],
  ]);
});

test("this test should return notice that patrol boat has been hit ", () => {
  expect(computerBoard.receiveAttack(8, 0)).toBe("Direct hit to patrol boat!");
});

test("this test should return notice of a missed shot", () => {
  expect(computerBoard.receiveAttack(9, 0)).toBe("Missed shot!");
});
