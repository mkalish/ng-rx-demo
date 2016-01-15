import jquery from 'jquery';
import angular from 'angular';
import rx from 'rx-angular'
import ShellController from './shell.controller';
import DraggableItem from './draggable.directive';
import KeyMoveItem from './key-move.directive';
import Ball from './ball.directive';
import GameContainer from './game-container.directive';



angular.module('ng-rx-pong', ['rx']);
angular.module('ng-rx-pong').controller('ShellController', ShellController);
angular.module('ng-rx-pong').directive('draggableItem', ['rx', (rx) => new DraggableItem(rx)]);
angular.module('ng-rx-pong').directive('keyMoveItem', ['rx', (rx) => new KeyMoveItem(rx)]);
angular.module('ng-rx-pong').directive('gameContainer', () => new GameContainer());
angular.module('ng-rx-pong').directive('ball', (rx) => new Ball(rx));


export default angular.module('ng-rx-pong');
