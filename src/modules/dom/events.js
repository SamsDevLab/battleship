import { boatPlacementContainer } from "./dom-helpers";
import { startScreenBoard } from "./dom-helpers";
import { usernameInput } from "./dom-helpers";
import { startGameButton } from "./dom-helpers";
import { BoatPlacement } from "./boat-placement-ui";

const boatPlacement = BoatPlacement();

boatPlacementContainer.addEventListener("click", (event) =>
  boatPlacement.handleBoatContainerClick(event),
);

// Start Screen Board listeners:
startScreenBoard.addEventListener("mouseover", (event) => {
  boatPlacement.handleHoverAddHighlight(event);
});

startScreenBoard.addEventListener("mouseout", (event) => {
  boatPlacement.handleHoverRemoveHighlight(event);
});

startScreenBoard.addEventListener("click", () => {
  boatPlacement.handleClickBoatSelectHighlight();
});

// Input listener:
usernameInput.addEventListener("change", (event) =>
  boatPlacement.handleInput(event),
);

// Start Game Button listener:
startGameButton.addEventListener("click", () =>
  boatPlacement.handleStartButtonClick(),
);
