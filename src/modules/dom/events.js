export const AttachEventListeners = (
  domHelpers,
  boatPlacement,
  gameUI,
  gameReset,
) => {
  domHelpers.boatPlacementContainer.addEventListener("click", (event) =>
    boatPlacement.handleBoatContainerClick(event),
  );

  domHelpers.startScreenBoard.addEventListener("mouseover", (event) => {
    boatPlacement.handleHoverAddHighlight(event);
  });

  domHelpers.startScreenBoard.addEventListener("mouseout", (event) => {
    boatPlacement.handleHoverRemoveHighlight(event);
  });

  domHelpers.startScreenBoard.addEventListener("click", () => {
    boatPlacement.handleClickBoatSelectHighlight();
  });

  domHelpers.usernameInput.addEventListener("change", (event) =>
    boatPlacement.handleInput(event),
  );

  domHelpers.startGameButton.addEventListener("click", () =>
    boatPlacement.handleStartButtonClick(),
  );

  domHelpers.computerDiv.addEventListener("click", (event) => {
    gameUI.handleComputerBoardClick(event);
  });

  domHelpers.playAgainButton.addEventListener("click", () => {
    gameReset.handleGameReset();
  });
};
