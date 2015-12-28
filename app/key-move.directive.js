export default class KeyMoveItem {
    constructor(rx) {
        this.restricts = 'E';
        this.template = '<div>Move me with the keyboard</div>';
        this.rx = rx;
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem) {
        elem.css({
            height: '200px',
            width: '50px',
            'background-color': '#000000',
            border: '1px solid #666666',
            color: '#ffffff',
            padding: '10px',
            position: 'absolute',
            left: '300px'
        });

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
            .subscribe(function(change){
                var top = elem[0].getBoundingClientRect().top;
                elem.css('top', (top + change.change) + 'px');
            })

            // .subscribe(function(){
            //     var top = elem[0].getBoundingClientRect().top;
            //     elem.css('top', (top - 10) + 'px');
            // });
    }
}
