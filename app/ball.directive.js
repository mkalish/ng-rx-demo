export default class Ball {
    constructor(rx) {
        this.restrict = 'E';
        this.template = '<div></div>';
        this.require = '^gameContainer';
        this.rx = rx;
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem, attrs, gameController) {
        elem.css({
            height: '50px',
            width: '50px',
            'background-color' : '#000000',
            'border-radius': '100%',
            left: '275px',
            top: '150px',
            position: 'absolute'
        });

        let xDirection = 5;
        let yDirection = 5;
        let container = elem.parent()[0].getBoundingClientRect();
        // Create an observable that emits when the 'GAME_END' event is broadcasted to the scope
        let gameEnd = scope.$eventToObservable('GAME_END');


        var moving = this.rx.Observable
            .interval(100)
            .map(function(){
                let box = elem[0].getBoundingClientRect();
                return {
                    top: box.top + yDirection,
                    left: box.left + xDirection,
                    width: box.width,
                    height: box.height
                };
            })
            .map(function(location){
                if(location.left >= container.right - location.width) {
                    location.left = container.right - location.width;
                    return {
                        ...location,
                        sideHit: 'right'
                    };
                }
                return location;
            })
            .map(function(location){
                if(location.left <= container.left) {
                    location.left = container.left;
                    return {
                        ...location,
                        sideHit: 'left'
                    };
                }
                return location;
            })
            .map(function(location){
                if(location.top <= container.top) {
                    location.top = container.top;
                    return {
                        ...location,
                        sideHit: 'top'
                    };
                }
                return location;
            })
            .map(function(location){
                if(location.top >= container.bottom - location.height) {
                    location.top = container.bottom - location.height;
                    return {
                        ...location,
                        sideHit: 'bottom'
                    };
                }
                return location;
            })
            // When the game is over, the ball should not be updated
            .takeUntil(gameEnd);

        gameController.registerBall(moving, () =>{
            // We really only want the ball the move when the game has started
            // and since observables are lazy we'll subscribe when the game starts
            moving.subscribe(function(location){
                elem.css({
                    top: location.top + 'px',
                    left: location.left + 'px'
                });
                switch(location.sideHit) {
                    case 'top':
                        yDirection = -1 * yDirection;
                        break;
                    case 'bottom':
                        yDirection = -1 * yDirection;
                        break;
                    case 'left':
                        xDirection = -1 * xDirection;
                        break;
                    case 'right':
                        xDirection = -1 * xDirection;
                        break;
                }
            });
        });
    }
}
