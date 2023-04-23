import Player from './Player';
import Gameboard from './Gameboard';
import Ship from './Ship';

export default class Storage {
	
	// PLAYER
	
	static savePlayer (data) {
		localStorage.setItem('player', JSON.stringify(data));
	};

	static initPlayer (name, gameBoard) {
		const player = new Player(name, gameBoard);
		return player;
	};
	
	static getPlayer () {
		const playerJSON = JSON.parse(localStorage.getItem('player'));

		const ships = [];
		for (const ship of playerJSON.gameBoard.ships) {
			ships.push(new Ship(ship.type, ship.hits, ship.positionArr, ship.sunk));
		}

		const gameBoard = new Gameboard(playerJSON.gameBoard.board, ships)
		const player = Storage.initPlayer(playerJSON.name, gameBoard);
		return player;
	};

	// COMPUTER

	static saveComputer (data) {
		localStorage.setItem('computer', JSON.stringify(data))
	}

	static initComputer (name, gameBoard) {
		const computer = new Player(name, gameBoard);
		return computer;
	}

	static getComputer () {
		const computerJSON = JSON.parse(localStorage.getItem('computer'));

		const ships = [];
		for (const ship of computerJSON.gameBoard.ships) {
			ships.push(new Ship(ship.type, ship.hits, ship.positionArr, ship.sunk));
		}

		const gameBoard = new Gameboard(computerJSON.gameBoard.board, ships)
		const computer = Storage.initComputer(computerJSON.name, gameBoard);
		return computer;
	}

	// INIT SHIP

	static saveShip (data) {
		localStorage.setItem('ship', JSON.stringify(data));
	}

	static initShip (type) {
		const ship = new Ship(type);
		return ship;
	}

	static getShip () {
		const shipJSON = JSON.parse(localStorage.getItem('ship'));
		const ship = Storage.initShip(shipJSON.type);
		return ship;
	}

	// AXIS

	static saveAxis (data) {
		localStorage.setItem('axis', JSON.stringify(data));
	};

	static initAxis (name) {
		const axis = name;
		return axis;
	};

	static getAxis () {
		const axisJSON = JSON.parse(localStorage.getItem('axis'));
		const axis = Storage.initAxis(axisJSON);
		return axis;
	};

	// SHIP PLACEMENT COUNT

	static saveShipCount (data) {
		localStorage.setItem('ship-count', JSON.stringify(data));
	};

	static getShipCount () {
		const count = JSON.parse(localStorage.getItem('ship-count'));
		return count;
	}

	static incrementShipCount () {
		let count = Storage.getShipCount();
		count++;
		Storage.saveShipCount(count);
	}

	// GAME TURN

	static saveTurn (data) {
		localStorage.setItem('turn', JSON.stringify(data));
	}

	static getTurn () {
		const turn = JSON.parse(localStorage.getItem('turn'));
		return turn;
	}

	static setTurn (data) {
		Storage.saveTurn(data);
	} 

	static changeTurn () {
		const turn = Storage.getTurn();
		
		if (turn === 'player') {
			Storage.saveTurn('computer');
		} else {
			Storage.saveTurn('player');
		}
	}

	// SCORE

	static saveComputerScore (data) {
		localStorage.setItem('computer-score', JSON.stringify(data));
	}

	static savePlayerScore (data) {
		localStorage.setItem('player-score', JSON.stringify(data));
	}

	static getComputerScore () {
		const computerScore =  JSON.parse(localStorage.getItem('computer-score'));
		return computerScore;
	}

	static getPlayerScore () {
		const playerScore =  JSON.parse(localStorage.getItem('player-score'));
		return playerScore;
	}

	static incrementComputerScore () {
		let score = Storage.getComputerScore();
		score++;
		Storage.saveComputerScore(score);
	}

	static incrementPlayerScore () {
		let score = Storage.getPlayerScore();
		score++;
		Storage.savePlayerScore(score);
	}
};