import Player from './Player'
const player1 = new Player('player1')
const player2 = new Player('player2')
const computer = new Player('computer')

player1.fireShot(0, player2.gameBoard)
player2.fireShot(1, player1.gameBoard)
computer.fireRandomShot(player1.gameBoard)

test.skip('test shot', () => {
    expect(player2.gameBoard.board[0].isShot).toBeTruthy()
})

test.skip('test shot 2', () => {
    expect(player1.gameBoard.board[1].isShot).toBeTruthy()
})

test.skip('random shot', () => {
    console.log(player1.gameBoard.board)
})