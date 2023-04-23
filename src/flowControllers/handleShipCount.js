import Storage from "../modules/Storage";
import GameSetup from "./gameSetup";
import ShipTypes from "../modules/ShipTypes";
import updateInstructionText from "../domControllers/updateSetupInstructionText";
import genComputerBoard from "./genComputerBoard";

const handleShipCount = (player, root) => {
    Storage.incrementShipCount();
    const count = Storage.getShipCount();
    
    if (count === Object.entries(ShipTypes).length) {
        genComputerBoard();
        GameSetup.startGame(root);
    } else {
        const nextShipName = Object.keys(ShipTypes)[count]
        const nextShip = Storage.initShip(nextShipName);
        Storage.saveShip(nextShip);
        updateInstructionText(player, nextShip);
    }
}

export default handleShipCount;