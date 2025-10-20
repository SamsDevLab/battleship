// import { InitGame } from "../game-controller-and-ui/index.js";
import { GameController } from "./game-controller.js";

/*
Dom Responsibilites:

• Render divs and buttons
    • Add classes to divs and buttons
• Accept input from user (name)
• Allow users to click on squares?? (Maybe, maybe not - maybe 
this should go to gameController)
• Dragging & dropping ships onto coordinates
• Render player turn to a banner
• Render name of player under board

*/

const addRowsAndColumns = (playerArr, computerArr) => {
  const playerDiv = document.querySelector(".player");
  const computerDiv = document.querySelector(".computer");

  const createElements = (arr, div) => {
    arr.forEach((row) => {
      const boardRow = document.createElement("div");
      boardRow.classList.add("row");
      div.append(boardRow);

      row.forEach((column) => {
        const boardColumn = document.createElement("button");
        boardRow.append(boardColumn);
      });
    });
  };

  createElements(playerArr, playerDiv);
  createElements(computerArr, computerDiv);
};

export const RenderToDom = () => {
  const players = GameController().initGame();

  const realPlayerObj = players.realPlayerObj;
  const computerPlayerObj = players.computerPlayerObj;

  addRowsAndColumns(realPlayerObj.board.board, computerPlayerObj.board.board);

  //   const buttons = document.querySelectorAll("button");

  //   buttons.forEach((button) => {
  //     button.addEventListener("click", () => {});
  //   });

  console.log(realPlayerObj);
};
