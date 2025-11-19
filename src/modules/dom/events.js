import { handleBoatContainerClick } from "./boat-placement-ui.js";
import { boatPlacementContainer } from "./dom-helpers";
import { handleHoverAddHighlight } from "./boat-placement-ui.js";
import { handleHoverRemoveHighlight } from "./boat-placement-ui.js";
import { handleClickBoatSelectHighlight } from "./boat-placement-ui.js";
import { handleStartButtonClick } from "./boat-placement-ui.js";
import { usernameInput } from "./dom-helpers";
import { startGameButton } from "./dom-helpers";

boatPlacementContainer.addEventListener("click", (event) =>
  handleBoatContainerClick(event),
);

// Start Screen Board listeners:
startScreenBoard.addEventListener("mouseover", (event) => {
  handleHoverAddHighlight(event);
});

startScreenBoard.addEventListener("mouseout", (event) => {
  handleHoverRemoveHighlight(event);
});

startScreenBoard.addEventListener("click", () => {
  handleClickBoatSelectHighlight();
});

usernameInput.addEventListener("change", (event) => handleInput(event));

startGameButton.addEventListener("click", () => handleStartButtonClick());
