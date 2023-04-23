import getLiveStorageData from "../flowControllers/liveStorageData";
import playPlayerTurn from "../flowControllers/playPlayerTurn";

const initComputerPositionBtns = (btn, root) => {

    btn.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        const data = getLiveStorageData(e);

        // disable event listener if not player's turn
        if (data.turn === 'computer') return;

        if (data.div.classList.contains('is-shot')) {
            data.div.classList.add('collision');
        } else {
            data.div.classList.add('active');
        }
        
        btn.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            data.div.classList.remove('active', 'collision');

            // remove event listener so that each square doesn't accrue mouseleave event listeners
            btn.removeEventListener('mouseleave', () => { return });
        })
    })
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.attributes.length === 0) return; // prevent error on rapid click of previously attacked loc
        const data = getLiveStorageData(e);
        
        if (data.turn === 'computer') return; // disable event listener if not player's turn
        if (data.computerGameboard.board[data.loc].isShot) return; // exit event listener if space has been shot
        
        playPlayerTurn(root, data);
    })
}

export default initComputerPositionBtns;