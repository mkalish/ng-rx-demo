export default class GameContainer {
    constructor(rx) {
        this.restrict = 'E';
        this.template =
            `<div class="container">
                <key-move-item></key-move-item>
                <draggable-item></draggable-item>
                <ball></ball>
            </div>`
        this.rx = rx;
        this.scope = {};
        this.controllerAs = 'vm';
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem) {
        // elem.css({
        //     border: '1px solid black',
        //     height: '500px',
        //     width: '500px',
        //     position: 'fixed',
        //     'z-index': -1
        // });
        elem.css({
            'margin-top': '10px'
        });
    }

    controller($scope) {

    }
}
