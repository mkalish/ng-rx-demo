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


        var moving = this.rx.Observable
            .interval(100)
            .map(function(){
                var loc = elem[0].getBoundingClientRect();
                return {
                    top: loc.top + yDirection,
                    left: loc.left + xDirection,
                    current: loc
                };
            })
            .map(function(posInfo){
                var containerLoc = elem.parent()[0].getBoundingClientRect();
                if(posInfo.current.right >= containerLoc.right) {
                    return {
                        ...posInfo,
                        sideHit: 'right'
                    };
                }
                return posInfo;
            })
            .map(function(posInfo){
                var containerLoc = elem.parent()[0].getBoundingClientRect();
                if(posInfo.current.left <= containerLoc.left) {
                    return {
                        ...posInfo,
                        sideHit: 'left'
                    };
                }
                return posInfo;
            })
            .map(function(posInfo){
                var containerLoc = elem.parent()[0].getBoundingClientRect();
                if(posInfo.current.top <= containerLoc.top) {
                    return {
                        ...posInfo,
                        sideHit: 'top'
                    };
                }
                return posInfo;
            })
            .map(function(posInfo){
                var containerLoc = elem.parent()[0].getBoundingClientRect();
                if(posInfo.current.bottom >= containerLoc.bottom) {
                    return {
                        ...posInfo,
                        sideHit: 'bottom'
                    };
                }
                return posInfo;
            })


        moving.subscribe(function(newPos){
            switch(newPos.sideHit) {
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
            elem.css({
                top: newPos.top + 'px',
                left: newPos.left + 'px'
            });
        });
    }
}
