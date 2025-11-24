export const AttachEventListeners = (domHelpers, boatPlacement) => {
  domHelpers.boatPlacementContainer.addEventListener("click", (event) =>
    boatPlacement.handleBoatContainerClick(event),
  );

  // Start Screen Board listeners:
  domHelpers.startScreenBoard.addEventListener("mouseover", (event) => {
    boatPlacement.handleHoverAddHighlight(event);
  });

  domHelpers.startScreenBoard.addEventListener("mouseout", (event) => {
    boatPlacement.handleHoverRemoveHighlight(event);
  });

  domHelpers.startScreenBoard.addEventListener("click", () => {
    boatPlacement.handleClickBoatSelectHighlight();
  });

  // Input listener:
  domHelpers.usernameInput.addEventListener("change", (event) =>
    boatPlacement.handleInput(event),
  );

  // Start Game Button listener:
  domHelpers.startGameButton.addEventListener("click", () =>
    boatPlacement.handleStartButtonClick(),
  );
};
