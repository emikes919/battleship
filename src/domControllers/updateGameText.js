import { responses } from "./gameTextReponses";

const updateGameText = (player, turn, trigger, ship=null) => {
    const gameTextContainer = document.querySelector('#game-text-container');
    const gameText = document.querySelector('#game-text');
    if (gameText === null) return; // handles playAgain scenaroi where #game-text div is replaced with #setup-instruction-text div
    gameTextContainer.removeChild(gameText);
    gameText.innerHTML = '';
    
    let responseList;   
    let response;

    switch (turn) {
        case 'player':
            responseList = responses.playerResponses;
            
            if (trigger === 'turn') { response = responseList.turn(player) }
            else if (trigger === 'hit') { response = responseList.hit(ship) }
            else if (trigger === 'miss') { response = responseList.miss() }
            else { response = responseList.sunk };
            break;

        case 'computer':
            responseList = responses.computerResponses;
           
            if (trigger === 'turn') { response = responseList.turn() }
            else if (trigger === 'hit') { response = responseList.hit(ship) }
            else if (trigger === 'miss') { response = responseList.miss() }
            else { response = responseList.sunk };
            break;
    }

    gameText.innerHTML = response;
    gameTextContainer.appendChild(gameText);
};

export default updateGameText;