export default class Ball {
    constructor(rx) {
        this.restrict = 'E';
        this.template = '<div></div>'
        this.rx = rx;
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, elem) {
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
    }
}
