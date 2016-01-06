var mongoose = require('mongoose');
var Model = mongoose.model('TodoModel');
var modelInstance = new Model();

exports.add = function(req, res) {
  var data = req.body;
 
  Model.create(data, function(err, docs) {;
    if (err) res.send(err);
    res.send(docs);
  });
};

exports.getByType = function(req, res) {
  var type = req.params.type;

  Model.find({
    type: type
  }, function(err, docs) {
    if (err) res.send(err);
    res.send(docs);
  });
};

exports.getById = function(req, res) {
  var id = req.params.id;

  Model.findById(id, function(err, docs) {
    if (err) res.send(err);
    //add pv statistics
    res.send(docs);
  });
};

exports.getAll = function(req, res) {
  Model.find({}, function(err, docs) {
    if (err) res.send(err);
    res.send(docs);
  });
};

exports.update = function(req, res) {
  var data = req.body;
  var id = req.params.id;

  Model.findByIdAndUpdate(id, data, function(err, docs) {
   console.log(docs);
    if (err) res.send(err);
    res.send(docs);
  });
};

exports.del = function(req, res) {
  var id = req.params.id;

  Model.remove({
    _id: id
  }, function(err, docs) {
    if (err) res.send(err);
    res.send(docs);
  });
};
