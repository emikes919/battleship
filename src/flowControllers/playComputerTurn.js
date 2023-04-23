import Modals from "../domControllers/Modals";
import GameController from "./gameController";
import Storage from "../modules/Storage";
import updateGameText from "../domControllers/updateGameText";
import updateScoreBoard from '../domControllers/updateScoreBoard';
import { gameTextTrigger } from "../domControllers/gameTextReponses";

const playComputerTurn = (computer, player, turn, root) => {
    // fire shot
    const playerGameboard = player.gameBoard;
    const loc = computer.fireSmartShot(playerGameboard);
    const div = document.getElementById(`player-${loc}`);
    
    div.classList.add('is-shot');
    
    // check if hit
    let hit = false;
    let outcome = 'miss';
    if (playerGameboard.checkIfShotHit(loc)) {
        hit = true;
        outcome = 'hit';
    };
    
    if (hit) {
        const hitShip = playerGameboard.getShipFromLocation(loc);
        hitShip.hit(loc); // hit ship object
        div.innerHTML = '<span>&#128293</span>'; // add 'fire' emoji
        updateGameText(player, turn, gameTextTrigger.hit, hitShip); // if hit but not sunk, update game text for vanilla hit
        
        // check if ship sunk and display modal
        if (hitShip.isSunk()) {
            outcome = 'sunk';

            for (const loc of hitShip.positionArr) {
                const sunkDiv = document.querySelector(`#player-${loc}`);
                sunkDiv.classList.add('sunk');
                sunkDiv.innerHTML = '<span>&#128128</span>'; // add 'skull' emoji
            }

            // first check if computer won
            if (GameController.checkWinner(player)) {
                outcome = 'end';
                Storage.incrementComputerScore();
                updateScoreBoard();
                Modals.buildGameOverModal(turn, computer, player, outcome, root);
                Modals.openGameOverModal();
                return;
            }
            
            Modals.buildShipSunkModal(hitShip, turn, outcome, root, player, computer);
            Modals.openShipSunkModal();
            return;
        }

        GameController.continueGame(root, turn, outcome, player, computer);
    } else {
        div.innerHTML = '<span>&#10060</span>'; // add 'x' emoji
        updateGameText(player, turn, gameTextTrigger.miss);
        GameController.continueGame(root, turn, outcome, player, computer);
    }
}

export default playComputerTurn;