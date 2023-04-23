import Storage from "../modules/Storage";
import GameSetup from "./gameSetup";
import buildGameWindow from "../domControllers/buildGameWindow";
import playComputerTurn from "./playComputerTurn";
import updateGameText from "../domControllers/updateGameText";
import { gameTextTrigger } from "../domControllers/gameTextReponses";

export default class GameController {
    static load (root) {
        const player = Storage.getPlayer();
        const playerScore = Storage.getPlayerScore();
        const computer = Storage.getComputer();
        const computerScore = Storage.getComputerScore();
        Storage.setTurn('player');
        buildGameWindow(player, computer, playerScore, computerScore, root);
    }

    static checkWinner (opponent) {
        return opponent.gameBoard.checkIfAllSunk();
    }

    static continueGame (root, turn, outcome, player, computer) {
        // const gameDelay = 100;
        const gameDelay = 2500;

        // do not continue game if game is over, playAgain func runs instead
        if (outcome === 'end') { 
            GameController.playAgain(player, computer, root);
            return;
        }

        if (turn === 'computer') {
            Storage.savePlayer(player);
            
            if (outcome === 'sunk') {
                // advance to player turn and update text immediately on modal click
                Storage.setTurn('player')
                const newTurn = Storage.getTurn();
                updateGameText(player, newTurn, gameTextTrigger.turn);
            } 
            
            else {
                // reset turn and indicate player's turn to player to enable clicking after short delay
                // so player click doesn't immediately overwrite gametext
                setTimeout(() => {
                    Storage.setTurn('player')
                    const newTurn = Storage.getTurn();
                    updateGameText(player, newTurn, gameTextTrigger.turn);
                }, gameDelay); 
            }

            return;
        }
        
        if (turn === 'player') {
            Storage.saveComputer(computer); // save computer board
            Storage.setTurn('computer'); // change turn back to computer to block player clicking until computer turn complete
            const newTurn = Storage.getTurn();

            // if player sinks a ship, play computers turn an update gametext with no delay
            if (outcome === 'sunk') {
                updateGameText(player, newTurn, gameTextTrigger.turn);

                // play computer's move after short delay to allow for next turn text to be visible
                setTimeout(() => {
                    playComputerTurn(computer, player, newTurn, root);
                }, gameDelay);

                return;
            }
            
            else { // outcome is vanilla hit or miss, so just advance the game after short delay
                const computersTurn = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(updateGameText(player, newTurn, gameTextTrigger.turn));
                    }, gameDelay);
                })
         
                // play computer's move after short delay to allow for next turn text to be visible
                computersTurn.then(() => {
                    setTimeout(() => {
                        playComputerTurn(computer, player, newTurn, root);
                    }, gameDelay);
                })
            }
        }
    }

    static playAgain (player, computer, root) {
        player.gameBoard.clearBoard();
        computer.gameBoard.clearBoard();
        Storage.savePlayer(player);
        Storage.saveComputer(computer);
        Storage.setTurn('player');
        GameSetup.load(root);
    }
}