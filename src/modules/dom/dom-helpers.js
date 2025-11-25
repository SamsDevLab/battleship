export const DOMHelpers = () => {
  const startScreen = document.querySelector("[data-modal='start-screen']");

  const startScreenBoard = document.querySelector(
    "[data-board='start-screen']",
  );

  const boatPlacementContainer = document.querySelector(
    "[data-container='boat-placement']",
  );

  const boatContainersArr = Array.from(
    document.querySelectorAll("[data-container='boat']"),
  );

  const axisButton = document.querySelector("[data-button='axis']");

  const usernameAndButtonContainer = document.querySelector(
    "[data-container='username-and-button']",
  );

  let usernameInput = usernameAndButtonContainer.querySelector(
    "[data-input='username']",
  );

  const startGameButton = usernameAndButtonContainer.querySelector(
    "[data-button='start-game']",
  );

  const messageBanner = document.querySelector("[data-container='banner']");

  const playerDiv = document.querySelector("[data-board='player']");

  const computerDiv = document.querySelector("[data-board='computer']");

  const winnerScreen = document.querySelector("[data-modal='winner-screen']");

  const winnerHeader = document.querySelector("[data-winner-header]");

  const playAgainButton = document.querySelector(
    "[data-modal-button='play-again']",
  );

  return {
    startScreen,
    startScreenBoard,
    boatPlacementContainer,
    boatContainersArr,
    axisButton,
    usernameAndButtonContainer,
    usernameInput,
    startGameButton,
    messageBanner,
    playerDiv,
    computerDiv,
    winnerScreen,
    winnerHeader,
    playAgainButton,
  };
};
