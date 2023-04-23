import initComputerPositionBtns from "./initComputerPositions";

const buildGameWindow = (player, computer, playerScore, computerScore, root) => {
    

    // global UI

    const gameWindow = document.getElementById('game-window');
    
    const gameTextContainer = document.createElement('div');
    gameTextContainer.setAttribute('id', 'game-text-container');
    
    const gameText = document.createElement('div');
    gameText.setAttribute('id', 'game-text')
    gameText.innerHTML = `YOUR MOVE, COMMANDER ${player.name.toUpperCase()}`;
    gameTextContainer.appendChild(gameText)
    gameWindow.appendChild(gameTextContainer);

    const gameplayContainer = document.createElement('div');
    gameplayContainer.setAttribute('id', 'gameplay-container');

    const scoreBoard = document.createElement('div');
    scoreBoard.setAttribute('id', 'score-board');
    
    const scoreBoardLeft = document.createElement('div');
    const scoreBoardMiddle = document.createElement('div');
    const scoreBoardRight = document.createElement('div');
    scoreBoardLeft.setAttribute('id', 'score-board-left');
    scoreBoardMiddle.setAttribute('id', 'score-board-middle');
    scoreBoardRight.setAttribute('id', 'score-board-right');
    
    const playerBoardTitle = document.createElement('h2');
    playerBoardTitle.classList.add('player-title');
    playerBoardTitle.innerHTML = `COMMANDER ${player.name.toUpperCase()}`;
    scoreBoardLeft.appendChild(playerBoardTitle);
    
    const computerBoardTitle = document.createElement('h2');
    computerBoardTitle.classList.add('player-title');
    computerBoardTitle.innerHTML = `${computer.name.toUpperCase()}`;
    scoreBoardRight.appendChild(computerBoardTitle);

    const scoreBoardTitle = document.createElement('div');
    scoreBoardTitle.setAttribute('id', 'score-board-title');
    scoreBoardTitle.innerHTML = 'SCOREBOARD'
    scoreBoardMiddle.appendChild(scoreBoardTitle);

    const liveScore = document.createElement('div');
    liveScore.setAttribute('id', 'live-score');
    liveScore.innerHTML = `${playerScore} - ${computerScore}`;
    scoreBoardMiddle.appendChild(liveScore)

    scoreBoard.appendChild(scoreBoardLeft);
    scoreBoard.appendChild(scoreBoardMiddle);
    scoreBoard.appendChild(scoreBoardRight);
    gameplayContainer.appendChild(scoreBoard);

    const gameboardsContainer = document.createElement('div');
    gameboardsContainer.setAttribute('id', 'gameboards-container');
    
    
    // player UI

    const playerContainer = document.createElement('div');
    playerContainer.classList.add('gameboard-container', 'player');
    
    const playerBoardTitleMobile = document.createElement('h2');
    playerBoardTitleMobile.classList.add('player-title-mobile');
    playerBoardTitleMobile.innerHTML = `COMMANDER ${player.name.toUpperCase()}`;
    playerContainer.appendChild(playerBoardTitleMobile);

    const playerGameboard = document.createElement('div');
    playerGameboard.classList.add('gameboard', 'player');

    // populate player board
    for (let i = 0; i < 100; i++) {
        let positionDiv = document.createElement('div');
        positionDiv.classList.add('position-div');
        positionDiv.setAttribute('id', `player-${i}`);
        positionDiv.innerHTML = `${i}`;

        if (player.gameBoard.board[i].hasShip) { positionDiv.classList.add('has-ship') }

        playerGameboard.appendChild(positionDiv)
    }
    playerContainer.appendChild(playerGameboard);
    gameboardsContainer.appendChild(playerContainer);
    

    // computer UI

    const computerContainer = document.createElement('div');
    computerContainer.classList.add('gameboard-container', 'computer');
    
    const computerBoardTitleMobile = document.createElement('h2');
    computerBoardTitleMobile.classList.add('player-title-mobile');
    computerBoardTitleMobile.innerHTML = `${computer.name.toUpperCase()}`;
    computerContainer.appendChild(computerBoardTitleMobile);

    const computerGameboard = document.createElement('div');
    computerGameboard.classList.add('gameboard', 'computer');


    // populate computer board
    for (let i = 0; i < 100; i++) {
        let positionDiv = document.createElement('div');
        positionDiv.classList.add('position-div');
        positionDiv.setAttribute('id', `computer-${i}`);
        positionDiv.innerHTML = `${i}`;
        initComputerPositionBtns(positionDiv, root);
        computerGameboard.appendChild(positionDiv);
    }
    computerContainer.appendChild(computerGameboard);
    gameboardsContainer.appendChild(computerContainer);
    
    // final append of everything to game window
    gameplayContainer.appendChild(gameboardsContainer);
    gameWindow.appendChild(gameplayContainer);
}

export default buildGameWindow;