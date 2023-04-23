import Storage from "../modules/Storage";

const genComputerBoard = () => {
    const computer = Storage.getComputer();
    computer.gameBoard.genRandomBoard();
    Storage.saveComputer(computer);
}

export default genComputerBoard;