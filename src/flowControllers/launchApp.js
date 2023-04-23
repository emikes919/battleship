import Storage from '../modules/Storage';
import GameSetup from "./gameSetup";

export default class App {
    static loadStartPage (root) {
        const startGameContainer = document.createElement('div');
        startGameContainer.setAttribute('id', 'start-game-container');

        App.buildTitleDiv(startGameContainer);
        App.buildPlayerForm(startGameContainer);
        root.appendChild(startGameContainer);
        App.initStartGameBtn(root);
    }

    static buildTitleDiv (container) {
        const titleDiv = document.createElement('div');
        titleDiv.setAttribute('id', 'title-div');
        const title = 'BATTLESHIP';
        titleDiv.innerHTML = title;
        container.appendChild(titleDiv);
    }

    static buildPlayerForm (container) {
        const form = document.createElement('form');
        form.setAttribute('id', 'start-game-form');
        form.innerHTML += `
            <div id="form-input-div">
                <label for="player-name" id="player-name-input-label">ENTER PLAYER NAME:</label>
                <input type="text" name="player-name" id="player-name-input" placeholder="BATTLESHIP COMMANDER" required>
                <span class="form-error"></span>
            </div>
            <div class="form-btn-div">
                <button id="start-game-btn" type="submit">START GAME</button>
            </div>
            <div id="mobile-notification">&#10071Play on your desktop browser for the best experience.</div>`
            

        container.appendChild(form);
    }
        
    static initStartGameBtn (root) {
        const btn = document.querySelector('#start-game-btn');
            
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = document.querySelector('#player-name-input');
            const error = document.querySelector('.form-error');

            if (!input.validity.valid) {
                error.innerHTML = '&#10071 Please enter a name to continue.'
                error.style = 'display: block;'
                return;
            }

            const playerName = input.value;
            const player = Storage.initPlayer(playerName);
            Storage.savePlayer(player);

            const computer = Storage.initComputer('computer');
            Storage.saveComputer(computer);

            Storage.saveComputerScore(0);
            Storage.savePlayerScore(0);
            
            GameSetup.load(root);
        })
    }
}