import Modals from "../domControllers/Modals";
import GameController from "./gameController";
import Storage from "../modules/Storage";
import updateGameText from "../domControllers/updateGameText";
import updateScoreBoard from "../domControllers/updateScoreBoard";
import { gameTextTrigger } from "../domControllers/gameTextReponses";

const playPlayerTurn = (root, liveStorageData) => {
    const turn = liveStorageData.turn;
    const player = liveStorageData.player;
    const computer = liveStorageData.computer;
    const computerGameboard = liveStorageData.computerGameboard;
    const loc = liveStorageData.loc;
    const div = liveStorageData.div;
    
    // fire shot
    player.fireShot(loc, computerGameboard); // update gameboard space isShot
    div.classList.add('is-shot'); // mark as is-shot every time if space hasn't been shot yet
    
    // check if hit
    let hit = false;
    let outcome = 'miss';
    if (computerGameboard.checkIfShotHit(loc)) { 
        hit = true;
        outcome = 'hit';
    };
    
    if (hit) {
        const hitShip = computerGameboard.getShipFromLocation(loc); // get hit ship
        hitShip.hit(loc); // hit ship object
        div.innerHTML = '<span>&#128293</span>'; // add 'fire' emoji
        updateGameText(player, turn, gameTextTrigger.hit, hitShip); // if hit but not sunk, update game text for vanilla hit
        
        // check if ship sunk and display modal
        if (hitShip.isSunk()) {
            outcome = 'sunk';

            for (const loc of hitShip.positionArr) {
                const sunkDiv = document.querySelector(`#computer-${loc}`);
                sunkDiv.classList.add('sunk');
                sunkDiv.innerHTML = '<span>&#128128</span>'; // add 'skull' emoji
            }

            // first check if player won
            if (GameController.checkWinner(computer)) {
                outcome = 'end';
                Storage.incrementPlayerScore();
                updateScoreBoard();
                Modals.buildGameOverModal(turn, player, computer, outcome, root);
                Modals.openGameOverModal();
                return;
            }

            Modals.buildShipSunkModal(hitShip, turn, outcome, root, player, computer);
            Modals.openShipSunkModal();
            return;
        }

        GameController.continueGame(root, turn, outcome, player, computer);
    } 
    
    else {
        div.innerHTML = '<span>&#10060</span>'; // add 'x' emoji
        updateGameText(player, turn, gameTextTrigger.miss);
        GameController.continueGame(root, turn, outcome, player, computer);
    }
}

export default playPlayerTurn;