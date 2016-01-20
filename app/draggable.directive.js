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
            'background-color': '#000000',
            border: '1px solid #666666',
            color: '#ffffff',
            padding: '10px',
            position: 'absolute',
            cursor: 'move',
            left: '11px'
        });

        const elemHeight = elem[0].getBoundingClientRect().height;
        var mouseup = this.rx.Observable.fromEvent(elem, 'mouseup');
        var mousemove = this.rx.Observable.fromEvent(document, 'mousemove');
        var mousedown = this.rx.Observable.fromEvent(elem, 'mousedown');
        var mouseleave = this.rx.Observable.fromEvent(elem, 'mouseleave');

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
                .map(function(newPos){
                    var maxTop = elem.parent()[0].getBoundingClientRect().top;
                    if(newPos.top < maxTop) {
                        return {
                            maxTop
                        }
                    }
                    return newPos.top;
                })
                .map(function(newTop){
                    var containerBottom = elem.parent()[0].getBoundingClientRect().bottom;
                    if((newTop+ elemHeight) > containerBottom) {
                        return containerBottom - elemHeight;
                    }
                    return newTop;
                })
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
        mousedrag.subscribe(function (newTop) {
            elem.css({
                top: newTop + 'px'
            });
        });
    }
}
