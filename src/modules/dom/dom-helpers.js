export const startScreen = document.querySelector(
  "[data-modal='start-screen']",
);
export const startScreenBoard = document.querySelector(
  "[data-board='start-screen']",
);
export const boatPlacementContainer = document.querySelector(
  "[data-container='boat-placement']",
);
export const boatContainersArr = Array.from(
  document.querySelectorAll("[data-container='boat']"),
);
export const usernameAndButtonContainer = document.querySelector(
  "[data-container='username-and-button']",
);
export let usernameInput = usernameAndButtonContainer.querySelector(
  "[data-input='username']",
);
export const startGameButton = usernameAndButtonContainer.querySelector(
  "[data-button='start-game']",
);
export const messageBanner = document.querySelector(
  "[data-container='banner']",
);
export const playerDiv = document.querySelector("[data-board='player']");
export const computerDiv = document.querySelector("[data-board='computer']");
export const winnerScreen = document.querySelector(
  "[data-modal='winner-screen']",
);
export const winnerHeader = document.querySelector("[data-winner-header]");
export const playAgainButton = document.querySelector(
  "[data-modal-button='play-again']",
);
