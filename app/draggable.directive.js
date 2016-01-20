export default class DraggableItem {
    constructor(rx) {
        this.restrict = 'E';
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
            'background-color': '#FFFFFF',
            border: '1px solid #666666',
            color: '#ffffff',
            padding: '10px',
            position: 'absolute',
            cursor: 'move',
            left: '311px'
        });

        const container = elem.parent()[0].getBoundingClientRect();
        const elemHeight = elem[0].getBoundingClientRect().height;


        // Observables of all the DOM events we care about while dragging
        let mouseup = this.rx.Observable.fromEvent(elem, 'mouseup');
        let mousemove = this.rx.Observable.fromEvent(document, 'mousemove');
        let mousedown = this.rx.Observable.fromEvent(elem, 'mousedown');
        let mouseleave = this.rx.Observable.fromEvent(elem, 'mouseleave');

        // This observable emits observables that will calculate where the drag has moved to
        let mousedrag = mousedown.flatMap((md) => {

            // calculate offsets when mouse down
            var startY = md.offsetY;

            // Calculate delta with mousemove until mouseup
            return mousemove.map((mm) => {
                    mm.preventDefault();
                    return mm.pageY - startY;
                })
                // No previous or future steps need to be modified
                // Just check if the newTop is in bounds and if not
                // return the container top or bottom
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
                // Once the mouse has left the draggable or a mouse up event has been emitted
                // stop moving the draggable container
                .takeUntil(mouseup.merge(mouseleave));
        });

        let paddlePos = mousedrag
            .map((newTop) => {
                return {
                    top: newTop,
                    bottom: newTop + elemHeight
                };
            })

        gameContainer.registerPaddle(paddlePos, 'left', elem[0].getBoundingClientRect())

        // Update position
        mousedrag.subscribe((newTop) => {
            // Since this is pong we only care about moving the paddle up and down
            elem.css({
                top: newTop + 'px'
            });
        });
    }
}
