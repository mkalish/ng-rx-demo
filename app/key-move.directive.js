export default class KeyMoveItem {
    constructor(rx) {
        this.restricts = 'E';
        this.template = '<div class="key_move">Move me with the keyboard</div>';
        this.rx = rx;
        this.require = '^gameContainer';
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem, attrs, gameContainer) {



        var upKeyDown = this.rx.Observable.fromEvent(document, 'keydown')
            .filter(function(event){
                return event.keyCode === 38;
            })
            .map(function(){
                return {change: -10}
            });

        var downKeyUp = this.rx.Observable.fromEvent(document, 'keydown')
            .filter(function(event){
                return event.keyCode === 40;
            })
            .map(function(){
                return {change: 10}
            });

        upKeyDown.merge(downKeyUp)
            .map(function(change){
                var upperBound = gameContainer.getBounds().top;
                var top = elem[0].querySelector('div').getBoundingClientRect().top;
                // if(top + change.change > upperBound) {
                //     console.log('upper bound');
                //     return upperBound;
                // }
                return top + change.change;
            })
            .subscribe(function(newTop){
                elem[0].querySelector('div').style.top = newTop + 'px';
            });
    }
}
