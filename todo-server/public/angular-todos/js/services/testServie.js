angular.module('angularTodoApp')
  .service('requestService', function($http, basicUrl) {
    var todos = [];

    this.add = function(todo) {
      todos.push(todo);
    };
    this.remove = function(todo) {
      todos.push(todo);
    };
    this.update = function(todo) {
      todos.push(todo);
    };
  });
