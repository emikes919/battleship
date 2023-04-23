import Ship from './Ship'
import ShipTypes from './ShipTypes';

export default class Gameboard {
    constructor (board, ships) {
        this.board = board || [];
        this.ships = ships || [];
        if (!this.board.length) this.init();
    }

    init () {
        for (let i = 0; i < 100; i++) {
            this.board.push(
                {
                    hasShip: false,
                    isShot: false
                }
            )
        }
    }

    receiveAttack (loc) {
        this.board[loc].isShot = true;
    }

    checkIfShotHit (loc) {
        return this.board[loc].hasShip
    }

    getShipFromLocation (loc) {
        return this.ships.find(ship => ship.positionArr.includes(loc));
    }

    checkCollisions (positionArr) {        
        // check x axis collisions against this list
        const collisions = [9, 19, 29, 39, 49, 59, 69, 79, 89];
        
        if (positionArr.some(loc => !this.board[loc])) { // check y axis
            return true;
        }
        
        else if (collisions.some(num => { // check x axis
                return [num, num + 1].every(combo => positionArr.includes(combo))
            })) {
            return true;
        } 

        else if (positionArr.some(loc => this.board[loc].hasShip)) { // check ship collisions
            return true;
        }
        
        else {
            return false;
        };
    };

    createPositionArray (loc, ship, axis) {
        const positionArr = [];
        for (let i = 0; i < ship.length; i++) {
            axis === 'x'
                ? positionArr.push(loc + i)
                : positionArr.push(loc + i * 10)
        }
        return positionArr;
    }

    placeShip (type, loc, axis) {
        const ship = new Ship(type);
        const positionArr = this.createPositionArray(loc, ship, axis)
        
        if (!this.checkCollisions(positionArr)) {
            ship.positionArr = positionArr;
            this.ships.push(ship);
            positionArr.forEach(loc => this.board[loc].hasShip = true)
            return 'successfully placed';
        } else {
            return 'collision!'
        }
    }

    genRandomAxis () {
        const randNum = Math.floor(Math.random() * 2)
        return randNum === 0 ? 'x' : 'y';
    }
    
    genRandomBoard () {
        for (const ship of Object.keys(ShipTypes)) {            
            while (true) {
                const axis = this.genRandomAxis();
                const loc = Math.floor(Math.random() * 100);
                const result = this.placeShip(ship, loc, axis);
                if (result === 'successfully placed') { break };
            }
        }
    }

    checkIfAllSunk () {
        for (const ship of this.ships) { if (!ship.isSunk()) return false };
        return true;
    }

    checkIfNoHits () {
        let count = 0;
        for (const loc of this.board) { 
            const ship = this.getShipFromLocation(count);
            if (loc.isShot && loc.hasShip && !ship.isSunk()) return false;
            count++
        }
        return true;
    }

    // allows a player to call the gameboard object of the opponent and see what's been hit, missed, and what's still open
    opponentViewOfBoard () {
        return this.board.map(cell => {
            return cell.isShot && cell.hasShip
                ? 'hit'
                : cell.isShot
                ? 'miss'
                : 'empty';
        })
    }

    getNeighbors (loc) {
        let left, up, right, down;
        const rightBorder = [9, 19, 29, 39, 49, 59, 69, 79, 89];
        
        // calc left neighbor
        if (loc % 10 === 0) { left = null }
        else { left = loc - 1 };

        // calc top neighbor
        if (loc < 10) { up = null }
        else { up = loc - 10 };

        // calc right neighbor
        if (rightBorder.includes(loc)) { right = null }
        else { right = loc + 1 };
        
        // calc down neighbor
        if (loc > 89) { down = null }
        else { down = loc + 10 };

        return { left, up, right, down };
    }
    
    getLongestHitArr (loc) {
        const locList = this.opponentViewOfBoard();
        const neighbors = this.getNeighbors(loc);
        const rightBorder = [9, 19, 29, 39, 49, 59, 69, 79, 89];
        
        // filter out non hit and sunk neighbors
        const hitNeighbors = Object.values(neighbors).filter(neighbor => {
            const ship = this.getShipFromLocation(neighbor);
            if (locList[neighbor] === 'hit' && !ship.isSunk()) return neighbor;
        })
        
        // record the start of each hitArr found in master array of arrays (sub array for the current loc + each hit neighbor)
        let listOfHitArrs = [];
        hitNeighbors.forEach(hitNeighbor => listOfHitArrs.push([loc, hitNeighbor]));
        
        // if there is only one hitArr, the longest hitArr has been found by definition
        // check if it has open neighbors, if so, return it and exit function
        // if not, shot choice logic will fail, so return false to direct smart shot func to follow different logic
        if (listOfHitArrs.length === 1) {
            const hitArr = listOfHitArrs[0];
            const delta = hitArr[1] - hitArr[0];
            const remainingArr = this.traceHitArr(hitArr[1], delta, locList, hitArr); 
            remainingArr.forEach(hit => {
                if (!hitArr.includes(hit)) { hitArr.push(hit) }
            });
            
            if (this.hitArrayHasOpenNeighbors(hitArr, locList)) { return hitArr }
            else return false;
        }
        
        // if there are multiple hit neighbors, loop through each hit neighbor
        // and trace right or down to the values to add to each sub arr in listOfHitArrs;
        let count = 0; // maintain count of which subarr we are updating
        for (const hitNeighbor of hitNeighbors) {
            const delta = hitNeighbor - loc; // get difference b/w hitNeighbor and loc to determine whether to trace right or down;

            // first check if at a deadend due to borders
            switch (delta) {
                // if going right, check if on right border (nowhere to go, nothing to trace and add to subarr)
                case 1:
                    if (rightBorder.includes(hitNeighbor)) {
                        count++;
                        continue;
                    } 
                    break;
                // if not going right, check bottom border (nowhere to go, nothing to trace and add to subarr)
                case 10:
                    if (hitNeighbor > 89) {
                        count++;
                        continue; 
                    } 
                    break;
            }

            const nextNeighborInChain = hitNeighbor + delta;
            
            // if next neighbor in chain isn't hit, we've found end of this hitArr, do nothing, move to next hitNeighbor
            if (locList[nextNeighborInChain] !== 'hit') { 
                count++;
                continue;
            } 
            
            // if hit, then check if it's part of a sunk ship, if so, we've found end of this hitArr, do nothing, move to next hitNeighbor
            const shipCheck = this.getShipFromLocation(nextNeighborInChain);
            if (shipCheck.isSunk()) {
                count++;
                continue;
            }

            // if hit and unsunk, update listOfHitArrs and keep tracing
            listOfHitArrs[count].push(nextNeighborInChain); // add to listOfHitArrs
            const remaningLocsInChain = this.traceHitArr(nextNeighborInChain, delta, locList);
            remaningLocsInChain.forEach(loc => listOfHitArrs[count].push(loc)); // push each chained loc to the relevant subarr
            count++; // increment loop to track what hitArr in the listOfHitArrs is being updated in the next loop
        }
        
        // loop through each sub hitArr and determine whether there are hittable neighbors, if so, add to clean arr of arrs
        let cleanListOfHitArrs = [];
        for (const subArr of listOfHitArrs) {
            if (this.hitArrayHasOpenNeighbors(subArr, locList)) {
                cleanListOfHitArrs.push(subArr);
            }
        }

        // if no hitArrs with hittable neighbors shot choice logic will fail
        // return false to direct smart shot func to follow different logic
        if (cleanListOfHitArrs.length === 0) { return false }; 

        const longestArr = this.getLongestSubArray(cleanListOfHitArrs);
        return longestArr;
    }

    // consider moving this to another file
    hitArrayHasOpenNeighbors (arr, locList) {
        arr = arr.sort();
        
        const delta = arr[1] - arr[0];
        const firstIndex = arr[0];
        const lastIndex = arr[arr.length - 1];
        const firstNeighbor = firstIndex - delta;
        const secondNeighbor = lastIndex + delta;
        const rightBorder = [9, 19, 29, 39, 49, 59, 69, 79, 89];

        switch (delta) {
            case 1:
                if (firstIndex % 10 === 0) {
                    if (locList[secondNeighbor] !== 'empty') return false;
                    else return true;
                }
                if (rightBorder.includes(lastIndex)) {
                    if (locList[firstNeighbor] !== 'empty') return false;
                    else return true;
                }
                if (locList[firstNeighbor] !== 'empty' && locList[secondNeighbor] !== 'empty') return false;
                else return true;

            case 10:
                if (firstIndex < 10) {
                    if (locList[secondNeighbor] !== 'empty') return false;
                    else return true;
                }
                if (lastIndex > 89) {
                    if (locList[firstNeighbor] !== 'empty') return false;
                    else return true;
                }
                if (locList[firstNeighbor] !== 'empty' && locList[secondNeighbor] !== 'empty') return false;
                else return true;
        }
    }

    // consider moving this to another file
    getLongestSubArray (arr) {
        let arrLengths = []

        let count = 0;
        for (const subArr of arr) {
            arrLengths.push(subArr.length);
            count++;
        }
        
        const maxLength = Math.max.apply(Math, arrLengths);
        const index = arrLengths.findIndex(length => length === maxLength);

        return arr[index];
    }
    
    traceHitArr (loc, delta, locList, hitArr=[]) {
        const nextLocInChain = loc + delta;
        const rightBorder = [9, 19, 29, 39, 49, 59, 69, 79, 89];
        
        
        // CHECK FOR DEAD ENDS TO EXIT RECURSION

        // first check if at a deadend due to borders
        switch (delta) {
            case 1:
                if (rightBorder.includes(loc)) return hitArr; // if going right, check if on right border (nowhere to go)
                break;
            case 10:
                if (loc > 89) return hitArr; // if not going right, check bottom border (nowhere to go)
                break;
        }

        if (locList[nextLocInChain] !== 'hit') return hitArr // if not on a border, check if hit

        // if hit, check if sunk
        const ship = this.getShipFromLocation(nextLocInChain);
        if (ship.isSunk()) return hitArr; 

        hitArr.push(nextLocInChain); // add hit unsunk neighbor to hitArr before tracing recursively on this neighbor
        this.traceHitArr(nextLocInChain, delta, locList, hitArr); // if hit and not sunk, run trace on this loc
        return hitArr;
    }

    // wipes gameboard if user selects to play again
    clearBoard () {
        this.board = [];
        this.ships = [];
        this.init();
    }
}