'use strict';

module.exports = Priority;
var priorities = global.nss.db.collection('priorities');
var Mongo = require('mongodb');

function Priority(priority){
  this._id = priority._id;
  this.name = priority.name;
  this.value = parseInt(priority.value);
}

/*
Priority.prototype.save = function(fn){
  Priority.findByName(this.name, function(){

  });
  priorities.save(this, function(err, record){
    fn(record);
  });
};
*/

Priority.prototype.save = function(fn){
  var self = this;

  if(self._id){
    priorities.save(self, function(err, records){
      fn(err);
    });
  }else{
    //---- findByName checks for duplicates
    Priority.findByName(this.name, function(priority){
      if(!priority){
        priorities.save(self, function(err, record){
          fn(err);
        });
      }else{
        fn(new Error('Duplicate Priority'));
      }
    });
  }
};

Priority.findAll = function(fn){
  priorities.find().toArray(function(err, records){
    fn(records);
  });
};

Priority.findByName = function(name, fn){
  priorities.findOne({name:name}, function(err, record){
    fn(record);
  });
};

Priority.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  priorities.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

Priority.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  priorities.remove({_id:_id}, function(err, record){
    fn(record);
  });
};

  /*Priority.findById(id, function(priority){
    var _id = Mongo.ObjectID(id);
    priorities.findOne({_id:_id}, function(err, record){
      fn(record);
    });
  };*/

