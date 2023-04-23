import Carrier from '../assets/images/carrier.jpg';
import Battleship from '../assets/images/battleship.jpg';
import Destroyer from '../assets/images/destroyer.jpg';
import Submarine from '../assets/images/submarine.jpg';
import Patrol from '../assets/images/patrol.jpg';

const ShipTypes = {
    'carrier': {
        length: 5,
        image: Carrier,
    },
    'battleship': {
        length: 4,
        image: Battleship,        
    },
    'destroyer': {
        length: 3,
        image: Destroyer,
    },
    'submarine': {
        length: 3,
        image: Submarine,
    },
    'patrol': {
        length: 2,
        image: Patrol,
    }
}

export default ShipTypes;