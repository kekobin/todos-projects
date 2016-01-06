var app = app || {};

(function() {
 var ENTER_KEY = 13,
     ALL_STATUS = 'all',
     ACTIVE_STATUS = 'active',
     COMPLETED_STATUS = 'completed';  
 
 var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      newTodo: '',
      isEditing: false,
      status: ALL_STATUS
    }
  },
  componentDidMount: function() {
   var self = this;
   var routes = {
     '/': function() {self.setState({status: ALL_STATUS});},
     '/active': function() {self.setState({status: ACTIVE_STATUS});},
     '/completed': function() {self.setState({status: COMPLETED_STATUS});}
   };

   var router = Router(routes);
   router.init('/');
  },
  handleChange: function(e) {
    this.setState({newTodo: e.target.value});
  },
  hanleKeydown: function(e) {
   if(e.keyCode !== ENTER_KEY) return;
   event.preventDefault();
   
   var val = this.state.newTodo.trim();
   
   if(val) {
    this.props.model.addTodo(this.state.newTodo);
    this.setState({newTodo: ''});
   }
  },
  destroy: function(todo) {
   this.props.model.remove(todo);
  },
  save: function(id, val) {
   this.props.model.update(id,val);
   this.setState({isEditing: ''});
  },
  handleEdit: function(todo) {
   this.setState({isEditing: todo.id});
  },
  handleToggle: function(todo) {
   this.props.model.toggle(todo);
  },
  handleClearCompleted: function() {
   this.props.model.clear();
  },
  render: function() {
   //这里state只要变化就会update这里的render，这是不合理的，后续优化??????
   var main, footer,
       model = this.props.model,
       todos = model.todos,
       TodoItem = app.TodoItem,
       TodoFooter = app.TodoFooter;
  
   //根据状态获取对应的todos
   var statusTodos = (this.state.status == ALL_STATUS) ? todos : todos.filter(function(todo) {
    var status = todo.completed ? COMPLETED_STATUS : ACTIVE_STATUS;
    return status == this.state.status;
   }, this);
   
   //获取未完成的todos，作为footer中相关逻辑的数据源
   var activeTodos = todos.filter(function(todo) {
    return !todo.completed;
   }, this);
   
   //注意这里使用map比forEach的好处，还有map的第二个参数可以传递context，因为里面使用需要用到this
   var todoItems = statusTodos.map(function(todo) {
     return (
      <TodoItem 
       todo={todo}
       onSave={this.save}
       isEditing={this.state.isEditing === todo.id}//这个state设置在这一层，是因为每次改变state的时候都会rerender一次，所以这一层应该看做是common owner of the state
       onEdit={this.handleEdit.bind(this, todo)}
       onDestroy={this.destroy.bind(this, todo)}
       toggle={this.handleToggle.bind(this, todo)}
      /> 
     );
   }, this);
   
   if(statusTodos.length) {
    main = (
     <section className="main">
       <input className="toggle-all" type="checkbox" />
       <ul className="todo-list">
        {todoItems}
       </ul>
     </section>
    );
   }
   
   if(todos.length) {
    footer = (
     <TodoFooter
      todos={activeTodos}
      status={this.state.status}
      clearCompleted={this.handleClearCompleted}
     />
    ); 
   }

   return (
    <div>
     <header className="header">
       <h1>todos</h1>
       <input className="new-todo" placeholder="What needs to be done?" 
        value={this.state.newTodo}
        onChange={this.handleChange}
        onKeyDown={this.hanleKeydown}
       />
     </header>
     {main}
     {footer}
    </div>
   )
  }
 });
 
 function render() {
  React.render(
   <TodoApp model={model}/>,
   document.getElementsByClassName('todoapp')[0]
  );
 }
 
 var model = new app.todoModel('todoapp');
 model.subscribe(render);
 
 //初始化
 render();
})();