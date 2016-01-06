var todos = require('../app/controller/todos');
var fs = require('fs');

module.exports = function(app, config) {
	//todos
	app.post('/api/todo', todos.add);
	app.get('/api/todo', todos.getAll);
	app.put('/api/todo/:id', todos.update);
	app.delete('/api/todo/:id', todos.del);
};
