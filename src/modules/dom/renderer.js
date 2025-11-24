export const Renderer = (domHelpers, state) => {
  const addRowsAndColumns = (board, div) => {
    const competitorBoard = div.dataset.board;

    for (let i = 0; i < board.length; i++) {
      const boardRow = document.createElement("div");
      boardRow.classList.add("row");
      boardRow.dataset.row = `${i}`;
      div.append(boardRow);

      for (let j = 0; j < board.length; j++) {
        const boardColumn = document.createElement("button");
        boardColumn.classList.add("column");
        boardColumn.dataset.column = `${j}`;

        if (board[i][j] === "missed" || board[i][j] === "hit") {
          markPreviousAttackOnBoard(board[i][j], boardColumn);
        } else if (board[i][j] !== null && competitorBoard !== "computer") {
          boardColumn.classList.add("highlight");
        }
        boardRow.append(boardColumn);
      }
    }
  };

  return {
    markPreviousAttackOnBoard: function (attack, boardColumn) {
      const markAttackSpan = document.createElement("span");
      markAttackSpan.classList.add(`${attack}-circle`);
      boardColumn.dataset.hitOrMiss = `${attack}`;
      boardColumn.append(markAttackSpan);
      boardColumn.classList.add("remove-pointer");
    },
    openStartScreen: function (realPlayerBoard, screenBoard, startScreen) {
      startScreen.classList.add("is-open");
      startScreen.showModal();
      screenBoard.replaceChildren();
      addRowsAndColumns(realPlayerBoard, screenBoard);
    },
    renderToDom: function () {
      const playerDiv = domHelpers.playerDiv;
      const computerDiv = domHelpers.computerDiv;
      const realPlayerObj = state.getRealPlayer();
      const computerPlayerObj = state.getComputerPlayer();

      playerDiv.textContent = "";
      computerDiv.textContent = "";

      addRowsAndColumns(realPlayerObj.gameMechanics.board, playerDiv);
      addRowsAndColumns(computerPlayerObj.gameMechanics.board, computerDiv);
    },
  };
};
