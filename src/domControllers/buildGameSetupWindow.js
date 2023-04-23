import Storage from "../modules/Storage";
import Axis from "./AxisToggle";
import initPlayerPositionBtn from "./initPlayerPositions";

const buildGameSetupWindow = (player, root) => {
    const gameWindow = document.createElement('div')
    gameWindow.setAttribute('id', 'game-window');
    
    const setupInstructionTextContainer = document.createElement('div');
    setupInstructionTextContainer.setAttribute('id', 'setup-instruction-text-container');
    gameWindow.appendChild(setupInstructionTextContainer);

    const setupInstructionText = document.createElement('h2');
    setupInstructionText.setAttribute('id', 'setup-instruction-text');
    const firstShip = Storage.getShip()
    setupInstructionText.innerHTML = `COMMANDER ${player.name.toUpperCase()}, PLACE YOUR ${firstShip.type.toUpperCase()}`;
    setupInstructionTextContainer.appendChild(setupInstructionText);
    
    const axisToggle = Axis.buildAxisToggle();
    Axis.initAxisToggle(axisToggle);
    gameWindow.appendChild(axisToggle);

    const setupBoardContainer = document.createElement('div');
    setupBoardContainer.setAttribute('id', 'setup-board-container');
    
    // create each individual square
    for (let i = 0; i < 100; i++) {
        let positionDiv = document.createElement('div');
        positionDiv.classList.add('position-div');
        positionDiv.setAttribute('id', `${i}`);
        positionDiv.innerHTML = `${i}`;
        initPlayerPositionBtn(positionDiv, root)
        setupBoardContainer.appendChild(positionDiv);
    }

    gameWindow.appendChild(setupBoardContainer);
    root.appendChild(gameWindow);
}

export default buildGameSetupWindow;