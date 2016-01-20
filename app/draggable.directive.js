export default class DraggableItem {
    constructor(rx) {
        this.restrict = 'E';
        this.template = '<div>Drag Me</div>';
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
            cursor: 'move'
        });


        // Observables of all the DOM events we care about while dragging
        let mouseup = this.rx.Observable.fromEvent(elem, 'mouseup');
        let mousemove = this.rx.Observable.fromEvent(document, 'mousemove');
        let mousedown = this.rx.Observable.fromEvent(elem, 'mousedown');
        let mouseleave = this.rx.Observable.fromEvent(elem, 'mouseleave');

        // This observable emits observables that will calculate where the drag has moved to
        let mousedrag = mousedown.flatMap(function (md) {

            // calculate offsets when mouse down
            var startX = md.offsetX;

            // Calculate delta with mousemove until mouseup
            return mousemove.map(function (mm) {
                    mm.preventDefault();
                    return mm.pageY - startY;
                })
                // Once the mouse has left the draggable or a mouse up event has been emitted
                // stop moving the draggable container
                .takeUntil(mouseup.merge(mouseleave));
        });

        // Update position
        mousedrag.subscribe(function (newTop) {
            // Since this is pong we only care about moving the paddle up and down
            elem.css({
                top: newTop + 'px'
            });
        });
    }
}
