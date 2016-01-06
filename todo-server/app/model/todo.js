var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: String,
  completed: Boolean
});

TodoSchema.methods = {};

mongoose.model('TodoModel', TodoSchema);
