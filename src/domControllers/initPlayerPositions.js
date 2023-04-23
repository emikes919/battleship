import Storage from "../modules/Storage";
import getSetupStorageData from "../flowControllers/setupStorageData";
import handleShipCount from "../flowControllers/handleShipCount";

const initPlayerPositionBtn = (btn, root) => {
    
    btn.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        const data = getSetupStorageData(e)            
        const collisions = data.gameBoard.checkCollisions(data.positionArr);
        
        if (collisions) {
            data.div.classList.add('collision');
        } else {
            data.positionArr.forEach(loc => {
                const div = document.getElementById(loc);
                div.classList.add('active');
            })
        }
        
        btn.addEventListener('mouseleave', (e) => {
            e.preventDefault();                
            data.div.classList.remove('collision');
            data.positionArr.forEach(loc => {
                if (loc > data.gameBoard.board.length - 1) return;
                const div = document.getElementById(loc);
                div.classList.remove('active');
            })
            
            // remove event listener so that each square doesn't accrue mouseleave event listeners
            btn.removeEventListener('mouseleave', () => { return });
        });
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const data = getSetupStorageData(e)            
        
        // do nothing if there is a collision or the current
        let collision;
        data.positionArr.forEach(loc => {
            const div = document.getElementById(loc)
            if (div.classList.contains('has-ship') || div.classList.contains('collision')) {
                collision = true;
                return;
            };
        })

        if (collision) return;

        // handle frontend
        data.div.classList.remove('active');
        data.positionArr.forEach(loc => {
            const div = document.getElementById(loc);
            div.classList.add('has-ship');
        })

        // handle backend and loop through ships
        data.gameBoard.placeShip(data.ship.type, data.loc, data.axis);
        Storage.savePlayer(data.player);
        handleShipCount(data.player, root);
    });
}

export default initPlayerPositionBtn;