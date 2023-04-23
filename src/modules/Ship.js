import ShipTypes from "./ShipTypes";

export default class Ship {
    constructor (type, hits=[], positionArr=[], sunk=false) {
        this.type = type;
        this.length = ShipTypes[type].length;
        this.hits = hits;
        this.positionArr = positionArr;
        this.sunk = sunk;
        this.image = ShipTypes[type].image;
    }

    hit (loc) {
        this.hits.push(loc)
        if (this.hits.length === this.length) {this.sunk = true};
    }

    isSunk () {
        return this.sunk;
    }
}