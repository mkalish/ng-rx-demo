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

        var mouseup = this.rx.Observable.fromEvent(elem, 'mouseup');
        var mousemove = this.rx.Observable.fromEvent(document, 'mousemove');
        var mousedown = this.rx.Observable.fromEvent(elem, 'mousedown');

        var mousedrag = mousedown.flatMap(function (md) {

            // calculate offsets when mouse down
            var startX = md.offsetX,
                startY = md.offsetY;

            // Calculate delta with mousemove until mouseup
            return mousemove.map(function (mm) {
                    mm.preventDefault();

                    return {
                        left: mm.pageX - startX,
                        top: mm.pageY - startY
                    };
                })
                .takeUntil(mouseup);
        });

        // Update position
        var subscription = mousedrag.subscribe(function (pos) {
            elem.css({
                top: pos.top + 'px',
                left: pos.left + 'px'
            });
        });
    }
}
