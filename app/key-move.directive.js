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

        const container = elem.parent()[0].getBoundingClientRect();
        const elemHeight = elem[0].getBoundingClientRect().height;


        let upKeyDown = this.rx.Observable.fromEvent(document, 'keydown')
            .filter(function(event){
                return event.keyCode === 38;
            })
            .map(function(){
                return -10
            });

        let downKeyUp = this.rx.Observable.fromEvent(document, 'keydown')
            .filter(function(event){
                return event.keyCode === 40;
            })
            .map(function(){
                return 10
            });

        upKeyDown.merge(downKeyUp)
            .map((change) => {
                let currentTop = elem[0].getBoundingClientRect().top;
                return currentTop + change;
            })
            // Nothing needs to be change in any of previous pipeline steps
            // Two new filters need to be added to keep the paddle within the
            // container
            .map((newTop) => {
                if(newTop < container.top) {
                    return container.top;
                }
                return newTop;
            })
            .map((newTop) => {
                if((newTop + elemHeight) > container.bottom) {
                    return container.bottom - elemHeight;
                }
                return newTop;
            })
            .subscribe(function(newTop){
                elem.css({
                    top: newTop + 'px'
                });
            });
    }
}
