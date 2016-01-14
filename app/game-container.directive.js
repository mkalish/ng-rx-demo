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
            border: '1px solid black',
            height: '500px',
            width: '500px',
            position: 'fixed',
            'z-index': -1
        });
        scope.boundingRect = elem[0].getBoundingClientRect();
    }

    controller($scope) {
        console.log(this);
        console.log($scope);
        console.log($scope.boundingRect);
        this.getBounds = getBounds;

        /////

        function getBounds() {
            if($scope.boundingRect) {
                return {
                    top: $scope.boundingRect.top,
                    bottom: $scope.boundingRect.bottom,
                    left: $scope.boundingRect.left,
                    right: $scope.boundingRect.right
                };
            }
        }
    }
}
