import Storage from "../modules/Storage";

export default class Axis {
    static buildAxisToggle () {
        const btn = document.createElement('button');
        btn.setAttribute('id', 'axis-toggle');
        btn.innerHTML = 'Axis: X';  
        const axis = Storage.initAxis('x');
        Storage.saveAxis(axis);
        return btn;
    }

    static initAxisToggle (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (Storage.getAxis() === 'x') {
                const axis = Storage.initAxis('y');
                Storage.saveAxis(axis);
                btn.innerHTML = 'Axis: Y';
            } else {
                const axis = Storage.initAxis('x');
                Storage.saveAxis(axis);
                btn.innerHTML = 'Axis: X';
            }
        })
    }
}