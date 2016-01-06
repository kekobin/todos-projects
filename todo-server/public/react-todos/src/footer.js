var app = app || {};

(function() {
 var ALL_STATUS = 'all',
     ACTIVE_STATUS = 'active',
     COMPLETED_STATUS = 'completed';  
     
 app.TodoFooter = React.createClass({
  render: function() {
   var clearBtn,
       todos = this.props.todos,
       status = this.props.status,
       itemMsg = todos.length > 1 ? 'items' : 'item';
   
   if(todos.length > 0) {
    clearBtn = (
     <button className="clear-completed" onClick={this.props.clearCompleted}>Clear completed</button>
    );
   }
      
   return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todos.length}</strong>
        <span> </span>
        <span>{itemMsg}</span>
        <span> left</span>
      </span>
      <ul className="filters">
        <li><a href="#/" className={status == ALL_STATUS ? 'selected' : ''}>All</a></li>
        <span> </span>
        <li><a href="#/active" className={status == ACTIVE_STATUS ? 'selected' : ''}>Active</a></li>
        <span> </span>
        <li><a href="#/completed" className={status == COMPLETED_STATUS ? 'selected' : ''}>Completed</a></li>
      </ul>
      {clearBtn}
    </footer>
   );
  }
 })
}());