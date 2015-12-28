import angular from 'angular';
import rx from 'rx-angular'
import ShellController from './shell.controller';
import DraggableItem from './draggable.directive';
import KeyMoveItem from './key-move.directive'



angular.module('ng-rx-pong', ['rx']);
angular.module('ng-rx-pong').controller('ShellController', ShellController);
angular.module('ng-rx-pong').directive('draggableItem', ['rx', (rx) => new DraggableItem(rx)]);
angular.module('ng-rx-pong').directive('keyMoveItem', ['rx', (rx) => new KeyMoveItem(rx)]);


export default angular.module('ng-rx-pong');
