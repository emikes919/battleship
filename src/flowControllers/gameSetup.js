import Storage from '../modules/Storage';
import GameController from './gameController';
import buildNav from '../domControllers/buildNav';
import buildGameSetupWindow from '../domControllers/buildGameSetupWindow';

export default class GameSetup {
    static load (root) {
        const player = Storage.getPlayer();
        const firstShip = Storage.initShip('carrier');
        Storage.saveShip(firstShip);
        Storage.saveShipCount(0);

        root.innerHTML = '';
        buildNav(root);
        buildGameSetupWindow(player, root)
    }

    static startGame (root) {
        const gameWindow = document.getElementById('game-window');
        gameWindow.innerHTML = '';
        GameController.load(root);
    }
}