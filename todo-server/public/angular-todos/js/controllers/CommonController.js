angular.module('angularTodoApp')
  .controller('CommonController', function($scope, $state, requestService) {
    var stateName = $state.current.name,
      status;

    status = $scope.status = (stateName == '/') ? 'All' : (stateName ==
      '/active') ? 'Active' : 'Completed';
    $scope.editedTodo = '';

    $scope.newTodo = function(e) {
      if (e.keyCode === 13) {
        requestService.addTodo({
          title: $scope.todo,
          completed: false
        });

        $scope.todo = '';
        getData();
      }
    };

    $scope.toggleCompleted = function(todo) {
      requestService.updateTodo(todo);
    };

    $scope.removeTodo = function(todo) {
      $scope.statusTodos = $scope.statusTodos.filter(function(item) {
        return item._id !== todo._id;
      });

      requestService.deleteTodo(todo._id);
    };

    $scope.clearCompleted = function() {
      $scope.todos.filter(function(todo) {
        if (todo.completed) {
          requestService.deleteTodo(todo._id);
        };
      });

      getData();
    };

    $scope.handleDblclick = function(todo) {
      $scope.editedTodo = todo;
    };

    $scope.editTodo = function(e, todo) {
      if (e.keyCode === 13) {
        $scope.editedTodo = '';
        requestService.updateTodo(todo);
      }
    };

    $scope.submitEdit = function(todo) {
      $scope.editedTodo = '';
      requestService.updateTodo(todo);
    };

    //init todos data from server.
    getData();

    function getData() {
      requestService.getTodo().then(function(resp) {
        if (resp.status && resp.status === 200 && resp.data) {
          $scope.todos = resp.data;
          getStatusTodos();
        }
      });
    }

    function getStatusTodos() {
      $scope.statusTodos = (status == 'All') ? $scope.todos : $scope.todos.filter(
        function(todo) {
          var tempStatus = todo.completed ? 'Completed' : 'Active';
          return tempStatus === status;
        });
    }
  });
