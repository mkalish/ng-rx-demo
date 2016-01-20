export default class GameContainer {
    constructor(rx) {
        this.restrict = 'E';
        this.template =
            `<div class="container">
                <key-move-item></key-move-item>
                <draggable-item></draggable-item>
            </div>`
        this.rx = rx;
        this.scope = {};
        this.controllerAs = 'vm';
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem) {
        elem.css({
            'margin-top': '10px'
        });
    }

    controller($scope) {

    }
}
