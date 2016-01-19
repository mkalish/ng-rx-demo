export default class GameContainer {
    constructor(rx) {
        this.restrict = 'E';
        this.template =
            `<div>
                <div>
                    <span>Left Score: {{leftScore}}</span>
                    <span>Right Score: {{rightScore}}</span>
                </div>
                <div class="container">
                    <key-move-item></key-move-item>
                    <draggable-item></draggable-item>
                    <ball></ball>
                </div>
            </div>`
        this.rx = rx;
        this.scope = {};
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem) {
        elem.css({
            'margin-top': '10px'
        });
        scope.leftScore = 0;
        scope.rightScore = 0;
    }

    controller($scope) {
        this.registerBall = registerBallStream;

        ////

        function registerBallStream(ballStream) {
            var score = ballStream
                .filter(function(info){
                    return info.sideHit === 'left' || info.sideHit === 'right';
                })
                .map(function(info){
                    return info.sideHit;
                });
            score.safeApply($scope,
                function(side){
                    if(side === 'left') {
                        $scope.leftScore++;
                    } else {
                        $scope.rightScore++;
                    }
                }
            ).subscribe();
        }
    }
}
