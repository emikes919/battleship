import GameController from '../flowControllers/gameController';
import WinnerImage from '../assets/images/winner.jpg';
import LoserImage from '../assets/images/loser.jpg'

const backdrop = document.getElementById('backdrop');
const shipSunkModal = document.getElementById('ship-sunk-modal');
const gameOverModal = document.getElementById('game-over-modal');

export default class Modals {
    
    static buildShipSunkModal (ship, turn, outcome, root, player, computer) {       
        let pronoun1 = 'YOU';
        let pronoun2 = 'THEIR';

        if (turn === 'computer') {
            pronoun1 = 'THEY';
            pronoun2 = 'YOUR';
        }
        
        shipSunkModal.innerHTML = `
            <div class='modal-title' id='ship-sunk-modal-title'>FATALITY!</div>
            <div class='modal-text-container'>
                <img id='ship-sunk-modal-image' src='${ship.image}'>
                <p class='modal-text'>${pronoun1} SUNK ${pronoun2} ${ship.type.toUpperCase()}!</p>
            </div>
            <button class='modal-btn' type='button'>CONTINUE</button>`

        const btn = document.querySelector('.modal-btn');
        btn.addEventListener('click', () => {
            GameController.continueGame(root, turn, outcome, player, computer);
            Modals.closeShipSunkModal();
        });
    }
    
    static buildGameOverModal (turn, winner, loser, outcome, root) {
        let computer;
        let player;
        let image;

        if (loser.name !== 'computer') { 
            computer = winner;
            player = loser;
            image = LoserImage;
        } else {
            computer = loser;
            player = winner;
            image = WinnerImage;
        }

        gameOverModal.innerHTML =  `
            <h2 class='modal-title' id='game-over-modal-title'>GAME OVER</h2>
            <img id='game-over-modal-image' src='${image}'>
            <button class='modal-btn' type='button'>PLAY AGAIN</button>`

        const btn = document.querySelector('.modal-btn');
        btn.addEventListener('click', () => {
            Modals.closeGameOverModal();
            GameController.continueGame(root, turn, outcome, player, computer);
        });
    }
    
    static openShipSunkModal () {
        backdrop.classList.add('show');
        shipSunkModal.classList.add('show');
    }
    
    static closeShipSunkModal () {
        backdrop.classList.remove('show');
        shipSunkModal.classList.remove('show');
        shipSunkModal.innerHTML = '';
    }
    
    static openGameOverModal () {
        backdrop.classList.add('show');
        gameOverModal.classList.add('show');
    }

    static closeGameOverModal () {
        backdrop.classList.remove('show');
        gameOverModal.classList.remove('show');
        gameOverModal.innerHTML = '';
    }
}