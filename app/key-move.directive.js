export default class KeyMoveItem {
    constructor(rx) {
        this.restricts = 'E';
        this.template = '<div></div>';
        this.rx = rx;
        this.require = '^gameContainer';
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem, attrs, gameContainer) {
        elem.css({
            height: '200px',
            width: '25px',
            'background-color': '#000000',
            border: '1px solid #666666',
            color: '#ffffff',
            padding: '10px',
            position: 'absolute',
            left: '810px'
        });

        const elemHeight = elem[0].getBoundingClientRect().height;

        var upKeyDown = this.rx.Observable.fromEvent(document, 'keydown')
            .filter(function(event){
                return event.keyCode === 38;
            })
            .map(function(){
                return -10
            });

        var downKeyUp = this.rx.Observable.fromEvent(document, 'keydown')
            .filter(function(event){
                return event.keyCode === 40;
            })
            .map(function(){
                return 10
            });

        let arrowKeyMovement = upKeyDown.merge(downKeyUp)
            .map(function(change){
                var newTop = elem[0].getBoundingClientRect().top + change;
                var containerTop = elem.parent()[0].getBoundingClientRect().top;
                if(newTop < containerTop) {
                    return containerTop;
                }
                return newTop;
            })
            .map(function(newTop){
                var containerBottom = elem.parent()[0].getBoundingClientRect().bottom;
                if((newTop + elemHeight) > containerBottom) {
                    return containerBottom - elemHeight;
                }
                return newTop;
            });

            arrowKeyMovement.subscribe(function(newTop){
                elem.css({
                    top: newTop + 'px'
                });
            });

        let paddlePosition = arrowKeyMovement
            .map((newTop) => {
                return {
                    top: newTop,
                    bottom: newTop + elemHeight
                }
            });

        gameContainer.registerPaddle(paddlePosition, 'right');
    }
}
