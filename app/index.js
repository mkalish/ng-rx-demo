import angular from 'angular';
import rx from 'rx-angular'
import ShellController from './shell.controller.js';
import DraggableItem from './draggable.directive.js';



angular.module('ng-rx-pong', ['rx']);
angular.module('ng-rx-pong').controller('ShellController', ShellController);
angular.module('ng-rx-pong').directive('draggableItem', ['rx', (rx) => new DraggableItem(rx)]);


export default angular.module('ng-rx-pong');
