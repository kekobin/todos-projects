var app = app || {};

(function() {
 var Utils = 	app.Utils;
 
  app.todoModel = function(key) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChange = [];
  };
  
  app.todoModel.prototype.addTodo = function(todo) {
    this.todos.push({
     id: Utils.uuid(),
     title: todo,
     completed: false
    });
    
    this.inform();
  };
  
  app.todoModel.prototype.remove = function(todo) {
   this.todos = this.todos.filter(function(item) {
    return item.id !== todo.id;
   });
   
   this.inform(); 
  };
  
  app.todoModel.prototype.subscribe = function(render) {
   this.onChange.push(render);
  };
  
  app.todoModel.prototype.inform = function() {
   Utils.store(this.key, this.todos);
   this.onChange.forEach(function(cb) {cb();});
  };
  
  app.todoModel.prototype.update = function(id, val) {
   this.todos.forEach(function(todo) {
    if(todo.id === id) {
     todo.title = val;
     this.inform();
     return;
    }
   }, this);
  };
  
  app.todoModel.prototype.toggle = function(targetTodo) {
   this.todos.forEach(function(todo) {
    if(todo.id === targetTodo.id) {
     todo.completed = !todo.completed;
     this.inform();
     return;
    }
   }, this);
  };
  
  app.todoModel.prototype.clear = function() {
   // for(var i=0;i<this.todos.length;i++) {
   //  var todo = this.todos[i];
   //  if(todo.completed) {
   //   this.todos.splice(i, 1);
   //   i--;
   //  }
   // }
   //相比上面那种方式不仅简单得多，效率也高多了
   this.todos = this.todos.filter(function(todo) {
    return !todo.completed;
   });
   
   this.inform();
  };
})();