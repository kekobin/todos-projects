var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

module.exports = {
	db: 'mongodb://localhost/todos',
	root: rootPath,
	app: {
		name: 'todos'
	}
};
