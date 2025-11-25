export const GameUI = (domHelpers, gameController, state, renderer) => {
  const announceWinner = (winnerObj) => {
    domHelpers.winnerScreen.classList.add("show-winner");
    domHelpers.winnerScreen.showModal();
    domHelpers.winnerHeader.textContent = `${winnerObj.name} wins the game!`;
  };

  const checkForOccupiedColumn = (event) => {
    console.log(event);
    if (
      event.target.dataset.hitOrMiss === "missed" ||
      event.target.parentNode.dataset.hitOrMiss === "missed" ||
      event.target.dataset.hitOrMiss === "hit" ||
      event.target.parentNode.dataset.hitOrMiss === "hit"
    ) {
      return true;
    } else return false;
  };

  const handleAttackResult = (attackResult, player) => {
    if (attackResult === "All boats have been sunk!") {
      announceWinner(player);
    }

    domHelpers.messageBanner.textContent = "";
    domHelpers.messageBanner.textContent = attackResult;

    renderer.renderToDom();
  };

  const getRowsAndColumns = (event) => {
    const targetRow = event.target.parentElement.dataset.row;
    const targetColumn = event.target.dataset.column;

    return { targetRow, targetColumn };
  };

  const attackComputer = (rowsAndCols, computerPlayer, realPlayer) => {
    const attackResult = gameController.attack(
      rowsAndCols.targetRow,
      rowsAndCols.targetColumn,
      computerPlayer,
      realPlayer,
    );

    handleAttackResult(attackResult, realPlayer);
  };

  const getRandomCoords = (playerBoard) => {
    const row = Math.floor(Math.random(playerBoard.length) * 10);
    const col = Math.floor(Math.random(playerBoard[0].length) * 10);

    if (playerBoard[row][col] === "hit" || playerBoard[row][col] === "missed") {
      return getRandomCoords(playerBoard);
    } else {
      return { row, col };
    }
  };

  const attackPlayer = () => {
    const realPlayer = state.getRealPlayer();
    const computerPlayer = state.getComputerPlayer();
    const playerBoard = realPlayer.gameMechanics.board;

    let random = getRandomCoords(playerBoard);

    const attackResult = gameController.attack(
      random.row,
      random.col,
      realPlayer,
      computerPlayer,
    );

    handleAttackResult(attackResult, computerPlayer);
  };

  return {
    handleComputerBoardClick: function (event) {
      const computerPlayer = state.getComputerPlayer();
      const realPlayer = state.getRealPlayer();

      const occupied = checkForOccupiedColumn(event);

      if (occupied === true) {
        domHelpers.messageBanner.textContent = "";
        domHelpers.messageBanner.textContent =
          "Target has already been shot. Try again!";
        return;
      }

      const rowsAndCols = getRowsAndColumns(event);
      attackComputer(rowsAndCols, computerPlayer, realPlayer);
      setTimeout(attackPlayer, 1700);
    },
  };
};
