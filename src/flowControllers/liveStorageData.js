import Storage from "../modules/Storage";

const getLiveStorageData = (e) => {
    const player = Storage.getPlayer();
    const playerGameBoard = player.gameBoard;
    const computer = Storage.getComputer();
    const computerGameboard = computer.gameBoard;
    const computerShips = computerGameboard.ships;
    const turn = Storage.getTurn();
    const loc = parseInt(e.target.attributes[1].value.split('-')[1]);
    const computerDivID = 'computer'.concat('-', loc);
    const div = document.getElementById(computerDivID);

    return {
        player,
        playerGameBoard,
        computer,
        computerGameboard,
        computerShips,
        turn,
        loc,
        div
    }
}

export default getLiveStorageData;