import Gameboard from './Gameboard'
import Ship from './Ship'

describe('gameboard basics', () => {
    let testboard = new Gameboard();

    test('board length', () => {
        expect(testboard.board.length).toBe(100)
    })
    
    test('coord contents hasShip', () => {
        expect(testboard.board[0].hasShip).toBe(false)
    })
    
    test('coord contents isShot', () => {
        expect(testboard.board[0].isShot).toBe(false)
    })

    test('get neighbors', () => {
        expect(testboard.getNeighbors(82)).toEqual(
            {
                left: 81,
                right: 83,
                up: 72,
                down: 92
            }
        )

        expect(testboard.getNeighbors(95)).toEqual(
            {
                left: 94,
                right: 96,
                up: 85,
                down: null,
            }
        )

        expect(testboard.getNeighbors(0)).toEqual(
            {
                left: null,
                right: 1,
                up: null,
                down: 10,
            }
        )
    })

    test.skip('get longest hit arr', () => {
        testboard.placeShip('carrier', 12, 'x');
        testboard.placeShip('battleship', 22, 'x');
        testboard.placeShip('destroyer', 32, 'x');
        testboard.placeShip('submarine', 42, 'x');
        testboard.placeShip('patrol', 52, 'x');

        const ship1 = testboard.ships[0];
        const ship2 = testboard.ships[1];
        const ship3 = testboard.ships[2];
        const ship4 = testboard.ships[3];
        const ship5 = testboard.ships[4];
        
        ship1.hit(12);
        ship1.hit(13);
        ship2.hit(22);
        ship3.hit(32);
        ship4.hit(42);
        ship5.hit(52);

        testboard.receiveAttack(2);
        // testboard.receiveAttack(11);
        testboard.receiveAttack(12);
        testboard.receiveAttack(13);
        testboard.receiveAttack(22);
        testboard.receiveAttack(32);
        testboard.receiveAttack(42);
        testboard.receiveAttack(52);
        testboard.receiveAttack(62);

        const locList = testboard.opponentViewOfBoard();
        const hitArr = testboard.getLongestHitArr(12);
        const hitArrayHasOpenNeighbors = testboard.hitArrayHasOpenNeighbors(hitArr, locList)
    
        // console.log('hitArr is:')
        // console.log(hitArr)
        
        // expect(hitArr).toEqual([12, 22, 32, 42, 52]);
        expect(hitArr).toEqual([12, 13]);
        expect(hitArrayHasOpenNeighbors).toBeTruthy();
    })

    test('hit array has open neighbors', () => {
        testboard.placeShip('carrier', 35, 'x');
        testboard.placeShip('battleship', 45, 'x');
        testboard.placeShip('destroyer', 55, 'x');
        testboard.placeShip('submarine', 65, 'x');
        testboard.placeShip('patrol', 75, 'x');

        const ship1 = testboard.ships[0];
        const ship2 = testboard.ships[1];
        const ship3 = testboard.ships[2];
        const ship4 = testboard.ships[3];
        const ship5 = testboard.ships[4];
        
        ship1.hit(35);
        ship2.hit(45);
        ship3.hit(55);
        ship4.hit(65);
        ship5.hit(75);

        testboard.receiveAttack(25);
        testboard.receiveAttack(35);
        testboard.receiveAttack(45);
        testboard.receiveAttack(55);
        testboard.receiveAttack(65);
        testboard.receiveAttack(75);
        testboard.receiveAttack(85);

        const locList = testboard.opponentViewOfBoard();
        const hitArr = [35, 45, 55, 65, 75];
        const hitArrayHasOpenNeighbors = testboard.hitArrayHasOpenNeighbors(hitArr, locList);

        // expect(hitArrayHasOpenNeighbors).toBeTruthy();
        expect(hitArrayHasOpenNeighbors).toBeFalsy();
    })

    test('get longest subarr', () => {
        const arr = [
            [14, 15, 16, 17],
            [14, 24, 34]
        ]
        const longestSubArr = testboard.getLongestSubArray(arr);
        expect(longestSubArr).toEqual([14, 15, 16, 17])
    })
})

describe('ship manipulation', () => {
    let testboard = new Gameboard()
    const ship = new Ship('battleship');
    const testPositionArray = testboard.createPositionArray(13, ship, 'y');
    testboard.placeShip('submarine', 76, 'x')
    testboard.placeShip('battleship', 13, 'y')
    
    const ship1 = testboard.ships[0]
    const ship2 = testboard.ships[1]
    ship1.hit(76)

    test('create position array', () => {
        expect(testPositionArray).toEqual([13, 23, 33, 43])
    })

    test('create and place ship 1', () => {
        expect(testboard.ships[0]).toEqual(
            {
                type: 'submarine',
                length: 3,
                hits: [76],
                positionArr: [76, 77, 78],
                sunk: false,
            }
        )
    })

    test('create and place ship 2', () => {
        expect(testboard.ships[1]).toEqual(
            {
                type: 'battleship',
                length: 4,
                hits: [],
                positionArr: [13, 23, 33, 43],
                sunk: false,
            }
        )
    })

    test('check if Ship0 hit by length', () => {
        expect(ship1.hits.length).toBe(1)
    })

    test('check if Ship0 hit by index', () => {
        expect(ship1.hits[0]).toEqual(76)
    })

    test('check if all sunk 1', () => {
        expect(testboard.checkIfAllSunk()).toBeFalsy();
    })

    test('check if all sunk 2', () => {
        ship1.hit(77)
        ship1.hit(78)
        ship2.hit(13)
        ship2.hit(23)
        ship2.hit(33)
        ship2.hit(43)

        expect(testboard.checkIfAllSunk()).toBeTruthy();
    })

    test('getShipAtLocation', () => {
        expect(testboard.getShipFromLocation(76).type).toBe('submarine');
        expect(testboard.getShipFromLocation(77).type).toBe('submarine');
        expect(testboard.getShipFromLocation(78).type).toBe('submarine');
        expect(testboard.getShipFromLocation(13).type).toBe('battleship');
        expect(testboard.getShipFromLocation(23).type).toBe('battleship');
        expect(testboard.getShipFromLocation(33).type).toBe('battleship');
        expect(testboard.getShipFromLocation(43).type).toBe('battleship');
    })
})

describe('collision suite', () => {
    let testboard = new Gameboard()
    
    const shipX1 = new Ship('battleship');
    const shipX2 = new Ship('carrier');
    
    const shipY1 = new Ship('battleship');
    const shipY2 = new Ship('carrier');
    
    // place ship to be collided with
    testboard.placeShip('submarine', 56, 'x')

    test('x axis protected 1', () => {
        expect(testboard.placeShip(shipX1.type, 17, 'x')).toBe('collision!')
    })

    test('x axis protected 2', () => {
        expect(testboard.placeShip(shipX2.type, 8, 'x')).toBe('collision!')
    })
    
    test('y axis protected 1', () => {
        expect(testboard.placeShip(shipY1.type, 73, 'y')).toBe('collision!')
    })
    
    test('y axis protected 2', () => {
        expect(testboard.placeShip(shipY2.type, 60, 'y')).toBe('collision!')
    })
    
    test('check ship to be collided with is in place', () => {
        expect(testboard.ships[0]).toEqual(
            {
                type: 'submarine',
                length: 3,
                hits: [],
                positionArr: [56, 57, 58],
                sunk: false,
            }
        )
    })

    test('board updates hasShip in correct loc for ship to be collided with', () => {
        expect(testboard.board[56].hasShip).toBeTruthy();
    })

    test('checkCollisions func against existing ship', () => {
        expect(testboard.checkCollisions([47, 57, 67])).toBeTruthy()
    })
    
    test('ship collision with placeShip', () => {
        expect(testboard.placeShip('carrier', 16, 'y')).toBe('collision!')
    })

    test('no collision', () => {
        expect(testboard.placeShip('patrol', 1, 'x')).toBe('successfully placed')
    })
})

describe('board randomization', () => {
    const testboard = new Gameboard();
    const randTest = testboard.genRandomAxis();
    const regex = /x|y/;
    testboard.genRandomBoard();
    const ships = testboard.ships;

    const collidingShipsList = [
        {'type': 'carrier', positionArr: [1, 2, 3, 4, 5]},
        {'type': 'carrier', positionArr: [6, 7, 8, 9]},
        {'type': 'carrier', positionArr: [9, 10, 11]},
    ]

    const checkRandomCollision = (shipsArr) => {
        let arr = [];

        shipsArr.map(ship => ship.positionArr)
            .forEach(positionArr => positionArr
                .forEach(loc => arr.push(loc)));

        const set = new Set(arr);
        return set.size === arr.length ? false : true;
    }

    test('genRandomAxis', () => {
        expect(regex.test(randTest)).toBeTruthy();
    })

    test('forced collision', () => {
        expect(checkRandomCollision(collidingShipsList)).toBeTruthy();
    })

    test('random board no collisions', () => {
        for (let i = 0; i < 10000; i++) {
            expect(checkRandomCollision(ships)).toBeFalsy();
        }
    })
})