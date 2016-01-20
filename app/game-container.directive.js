export default class GameContainer {
    constructor(rx) {
        this.restrict = 'E';
        this.template =
            `<div>
                <div>
                    <span>Left Score: {{vm.score.left}}</span>
                    <span>Right Score: {{vm.score.right}}</span>
                    <button ng-hide="vm.started"  ng-click="vm.startGame()">Start Game</button>
                    <button ng-show="vm.started" ng-click="vm.stopGame()">Stop Game</button>
                </div>
                <div class="container">
                    <key-move-item></key-move-item>
                    <draggable-item></draggable-item>
                    <ball></ball>
                </div>
            </div>`
        this.rx = rx;
        this.scope = {};
        this.bindToController = true;
        this.controllerAs = 'vm';
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem) {
        elem.css({
            'margin-top': '10px'
        });
        scope.rx = this.rx;
    }

    controller($scope, rx) {
        var vm = this;
        this.started = false;
        this.score = {
            left: 0,
            right: 0
        }
        this.startGame = startGame;
        this.stopGame = stopGame;
        this.registerBall = registerBall;
        this.registerPaddle = registerPaddle;
        this.paddles = [];

        ////////

        function stopGame() {
            $scope.$broadcast('GAME_END');
            vm.score = { left: 0, right: 0};
            vm.started = false;
        }

        function startGame() {
            this.started = true;
            this.ballOnGameStart();

            // The combineLatest operator will return an array of the last emitted
            // value from the streams passed in
            // Important caveat is that combineLatest will only emit a value after
            // all the streams passed in emit a value
            // http://rxmarbles.com/#combineLatest
            let game = rx.Observable.combineLatest(
                ...this.paddles,
                this.ballStream
            )
            .map((gameState) => {
                // We rely here on the order in which the paddles get registered
                // but additional logic could be added to make sure its the right one
                if(gameState[2].sideHit === 'left' && !isPaddleHit(gameState[1], gameState[2])) {
                    return {
                        left: vm.score.left,
                        right: ++vm.score.right
                    };
                } else if(gameState[2].sideHit === 'right' && !isPaddleHit(gameState[0], gameState[2])) {
                    return {
                        left: ++vm.score.left,
                        right: vm.score.right
                    };
                } else {
                    return vm.score;
                }
            });
            // Digest the game observable so that the scope score values get updated
            $scope
                .$digestObservables({'vm.score': game})
                // Subscribe to the game to start pulling out game states
                .subscribe();
        }

        function registerPaddle(paddleStream, side, startingPosition) {
            // Keep track of each paddle
            let paddle = paddleStream.
                map((location) => {
                    return {
                        ...location,
                        side: 'left'
                    };
                })
                // At the start of the game, the paddles have been moved
                // therefore the paddle observable has not emitted any values
                // to solve this we start each stream with the starting paddle position
                .startWith(startingPosition);
            this.paddles.push(paddle);
        }

        function registerBall(ballStream, onGameStart) {
            // Register the observable keeping track of the ball movement
            // and the callback to start the game
            this.ballStream = ballStream;
            this.ballOnGameStart = onGameStart;
        }

        function isPaddleHit(paddlePos, ballPos) {
            let ballBottom = ballPos.top + ballPos.height;
            return ballBottom < paddlePos.bottom && ballPos.top > paddlePos.top;
        }
    }
}
