import Storage from "../modules/Storage";

const getSetupStorageData = (e) => {
    const player = Storage.getPlayer();
    const gameBoard = player.gameBoard;
    const ship = Storage.getShip();
    const axis = Storage.getAxis();
    const loc = parseInt(e.target.attributes[1].value);
    const div = document.getElementById(loc);
    const positionArr = gameBoard.createPositionArray(loc, ship, axis);

    return {
        player,
        gameBoard,
        ship,
        axis,
        loc,
        div,
        positionArr
    }
}

export default getSetupStorageData;