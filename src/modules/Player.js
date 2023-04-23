import Gameboard from './Gameboard'

export default class Player {
    constructor (name, gameBoard) {
        this.name = name;
        this.gameBoard = gameBoard || new Gameboard();
    }

    fireShot (loc, gameBoard) {
        if (gameBoard.opponentViewOfBoard()[loc] === 'empty') {
            gameBoard.receiveAttack(loc)
        }
        return loc;
    }

    fireRandomShot (gameBoard) {
        let loc;
        
        while (gameBoard.opponentViewOfBoard()[loc] !== 'empty') {
            loc = Math.floor(Math.random() * 100)
        }

        gameBoard.receiveAttack(loc)

        return loc;
    }

    fireSmartShot (gameBoard) {
        // check if board contains any hit locs, if not, fire random shot at board
        if (gameBoard.checkIfNoHits()) {
            const shotLoc = this.fireRandomShot(gameBoard);
            return shotLoc; // exit function entirely
        }

        // search for hit locs that are part of hitArrs
        // once found, recursively trace hitArr to fire shot,
        // or fire random shot on neighbors of a hit loc that is not part of a hitArrs
        let count = -1;
        let loneHits = [];
        const locList = gameBoard.opponentViewOfBoard();

        for (const loc of locList) {
            count++; // count every loop regardless of outcome
            
            // skip all non hit locs if interated through whole board and fire on empty neighbor of first lone hit
            if (loc !== 'hit') {
                if (count === 99) { 
                    const firstLoneHit = loneHits[0]; // grab first lone hit
                    const loneHitNeighbors = gameBoard.getNeighbors(firstLoneHit);
                    const emptyNeighbors = Object.values(loneHitNeighbors).filter(neighbor => locList[neighbor] === 'empty');
                    const rand = Math.floor(Math.random() * emptyNeighbors.length);
                    const target = emptyNeighbors[rand];
                    const shotLoc = this.fireShot(target, gameBoard);
                    return shotLoc;
                } 
                else continue;
            };

            // BELOW CODE IN THIS LOOP APPLIES TO LOCS RETURNING "HIT"

            // if no unsunk hit loc is found after looping through entire board, fire random shot and exit function
            const ship = gameBoard.getShipFromLocation(count);
            if (ship.isSunk() && count === 99) { // fire random shot if looped through entire board (loc 99 is last loc)
                const shotLoc = this.fireRandomShot(gameBoard);
                return shotLoc; 
            }
            
            if (ship.isSunk()) continue; // skip hit loc if part of sunk ship (and haven't yet looped through entire board)


            // BELOW CODE IN THIS FOR LOOP APPLIES TO LOCS HIT LOCS THAT ARE NOT PART OF SUNK SHIPS

            // check if loc is part of continuous arr (return true if any neighbors are hit and not sunk)
            const neighbors = gameBoard.getNeighbors(count);
            const partOfHitArr = Object.values(neighbors).some(neighbor => {
                const shipCheck = gameBoard.getShipFromLocation(neighbor);
                return (locList[neighbor] === 'hit' && !shipCheck.isSunk()) ? true : false;
            })

            // take different action depending on whether or not loc is part of hit arr
            if (partOfHitArr) { 
                const longestHitArr = gameBoard.getLongestHitArr(count); // get longest unsunk hitArr
                
                // handle scenario where both sides of hitArr are taken (hitArr locs are part of different unsunk ships)
                if (!longestHitArr) {
                    const openNeighbors = Object.values(neighbors).filter(neighbor => locList[neighbor] === 'empty');
                    const rand = Math.floor(Math.random() * openNeighbors.length);
                    const target = openNeighbors[rand];
                    const shotLoc = this.fireShot(target, gameBoard);            
                    return shotLoc; // fires shot, so exit function entirely
                }
                
                const delta = longestHitArr[1] - longestHitArr[0];
                
                // find shotChoices on either side of hitArr
                let shotChoices = [];
                const choice1 = longestHitArr[0] - delta;
                const choice2 = longestHitArr[longestHitArr.length - 1] + delta;
                
                // add shotChoices to list of available choices if they are empty
                if (locList[choice1] === 'empty') { shotChoices.push(choice1) }
                if (locList[choice2] === 'empty') { shotChoices.push(choice2) }
                
                // if there are any available shot choices, randomly pick one and fire shot
                if (shotChoices.length !== 0) {
                    const rand = Math.floor(Math.random() * shotChoices.length);
                    const target = shotChoices[rand];
                    const shotLoc = this.fireShot(target, gameBoard);         
                    return shotLoc; // fires shot, so exit function entirely
                }
            } 
            
            // if at the last lone hit loc, this means no hitArrs have been found,
            // so fire random shot on neighbors of first lone hit loc
            else if (count === 99) {
                loneHits.push(count) // still record lone hit loc in case this is only lone hit loc that has been found
                const firstLoneHit = loneHits[0]; // grab first lone hit
                const loneHitNeighbors = gameBoard.getNeighbors(firstLoneHit);
                const emptyNeighbors = Object.values(loneHitNeighbors).filter(neighbor => locList[neighbor] === 'empty');
                const rand = Math.floor(Math.random() * emptyNeighbors.length);
                const target = emptyNeighbors[rand];
                const shotLoc = this.fireShot(target, gameBoard);
                return shotLoc; // fires shot, so exit function entirely
            } 
            
            // if not part of a hitArr and full board hasn't been iterated over, keep iterating over board
            else {
                loneHits.push(count); // record lone hit loc
                continue; // keep iterating through board until the end or until a hitArr is found
            }
        }
    } 
}