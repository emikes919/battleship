import Storage from "../modules/Storage";

const updateScoreBoard = () => {
    const liveScore = document.querySelector('#live-score');
    const playerScore = Storage.getPlayerScore();
    const computerScore = Storage.getComputerScore();
    liveScore.innerHTML = `${playerScore} - ${computerScore}`
}

export default updateScoreBoard;