export const GameReset = (domHelpers, gameController, state, renderer) => {
  const resetGameBoards = () => {
    domHelpers.playerDiv.replaceChildren();
    domHelpers.computerDiv.replaceChildren();
  };

  const resetPlayerObjs = () => {
    state.setPlayerObjsToDefault();
    const playerObjs = gameController.initGame();
    state.storeObjects(playerObjs);
  };

  const resetBoatContainers = () => {
    domHelpers.boatContainersArr.forEach((boatContainer) => {
      boatContainer.classList.remove("disabled");
      boatContainer.classList.add("hover-effect");
    });
  };

  const resetStartScreenColumns = () => {
    const highlightedColumns = Array.from(
      domHelpers.startScreenBoard.querySelectorAll(".highlight"),
    );
    highlightedColumns.forEach((column) => {
      column.classList.remove("highlight");
      column.classList.remove("disabled");
    });
  };

  const resetUsernameInput = () => {
    domHelpers.usernameInput.value = "";
  };

  const resetIncompleteWarning = () => {
    const errorTag = document.querySelector("[data-tag='error']");
    if (errorTag === null) {
      return;
    } else errorTag.remove();
  };

  return {
    handleGameReset: function () {
      domHelpers.winnerScreen.classList.remove("show-winner");
      domHelpers.winnerScreen.close();
      resetGameBoards();
      resetPlayerObjs();
      resetBoatContainers();
      resetStartScreenColumns();
      resetUsernameInput();
      resetIncompleteWarning();

      const realPlayer = state.getRealPlayer();
      renderer.openStartScreen(
        realPlayer.gameMechanics.board,
        domHelpers.startScreenBoard,
        domHelpers.startScreen,
      );
    },
  };
};
