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

        // Observable keeping track of down arrow key down event
        let upKeyDown = this.rx.Observable.fromEvent(document, 'keydown')
            .filter((event) => {
                return event.keyCode === 38;
            })
            .map(function(){
                return -10;
            });

        // Observable keeping track of up arrow key down event
        let downKeyDown = this.rx.Observable.fromEvent(document, 'keydown')
            .filter((event) => {
                return event.keyCode === 40;
            })
            .map(function(){
                return 10;
            });

        // Since the paddle is based on both observables,
        // they are merged into one and used to calculate the new position
        let movement = upKeyDown.merge(downKeyDown)
            .map((changeInTop) => {
                let currentTop = elem[0].getBoundingClientRect().top
                return currentTop + changeInTop;
            });

        movement
            .subscribe((newTop) => {
                elem.css({ top: newTop + 'px'});
            });
    }
}
