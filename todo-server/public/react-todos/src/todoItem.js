var app = app || {};

(function() {
  var ENTER_KEY = 13;
  
  app.TodoItem = React.createClass({
   getInitialState: function() {
    return {
     textEdit: this.props.todo.title
    };
   },
   blur: function() {
    var val = this.state.textEdit.trim(),
        todo = this.props.todo;
    
    if(val) {
     this.props.onSave(todo.id, val);
    }
   },
   onEditing: function(e) {
    this.setState({textEdit: e.target.value});
   },
   handleKeyDown: function(e) {
    if(e.keyCode !== ENTER_KEY) return;
    var val = this.state.textEdit.trim(),
        todo = this.props.todo;

    if(val) {
     this.props.onSave(todo.id, val);
    }
   },
   handleDoubleClick: function() {
    this.props.onEdit();
    // this.refs.textInput.getDOMNode().focus();//not work?-->因为上面一行onEdit里面更新state所引起的DOM变化还没有渲染完成。
   },
   //下面这两个方法非常的重要，在大型项目中可以极大的提升性能。决定是否要调用render进行更新
   shouldComponentUpdate: function(nextProps, nextState) {
    return (
     nextProps.todo !== this.props.todo ||
     nextProps.isEditing !== this.props.isEditing || 
     nextState.textEdit !== this.props.textEdit
    );
   },
   //在组件的更新已经同步到 DOM 中之后立刻被调用
   componentDidUpdate: function(prevProps) {
    if(!prevProps.isEditing && this.props.isEditing) {
     var node = React.findDOMNode(this.refs.textInput);
     node.focus();
     //setSelectionRange是原生dom本身支持的api func。
     node.setSelectionRange(node.value.length, node.value.length);
    }
   },
   render: function() {
    var todo = this.props.todo;

    return (
     <li className={classNames({
       editing: this.props.isEditing,
       completed: this.props.todo.completed
     })}>
       <div className="view">
         <input className="toggle" type="checkbox" onChange={this.props.toggle} checked={this.props.todo.completed}/>
         <label onDoubleClick={this.handleDoubleClick}>{todo.title}</label>
         <button className="destroy" onClick={this.props.onDestroy}></button>
       </div>
       <input 
         ref="textInput" 
         className="edit" 
         onChange={this.onEditing}
         onBlur={this.blur}
         onKeyDown={this.handleKeyDown}
         value={this.state.textEdit}
       />
     </li>
    );
   }
  });
})();