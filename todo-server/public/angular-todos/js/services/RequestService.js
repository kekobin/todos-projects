angular.module('angularTodoApp')
.factory('requestService', function($http, basicUrl) {
  return {
   getTodo: function() {
       return $http({
           method: "GET",
           url: basicUrl
       });
   },
   addTodo: function(todo) {
    return $http({
        method: "POST",
        url: basicUrl,
        data: todo
    });
   },
   updateTodo: function(todo) {
    return $http({
        method: "PUT",
        url: basicUrl + todo._id,
        data: todo
    });
   },
   deleteTodo: function(id) {
    return $http({
        method: "delete",
        url: basicUrl + id
    });
   }
  };
});
