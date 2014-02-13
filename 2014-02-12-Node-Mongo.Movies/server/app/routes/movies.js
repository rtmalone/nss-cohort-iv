'use strict';

var Movie = require('../models/movie');
var mongodb = require('mongodb');

exports.create = function(req, res){
  var db = req.app.locals.db;     //references the db we named in app.js; chyld set up this reference
  var movies = db.collection('movies');  //references a collection of a db
  
  var movie = new Movie(req.body);
  movies.insert(movie, function(err, records){
    res.send(records[0]);
  });
};

exports.index = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');

  movies.find().toArray(function(err, movies){
    res.send({movies: movies});
  });
};

exports.deleteRecord = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var id = new mongodb.ObjectID(req.params.id);

  movies.remove({_id: id}, function(err, recordCount){
    res.send({deleted:recordCount, id:req.params.id});
  });
};

exports.findMovie = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var id = new mongodb.ObjectID(req.params.id);
  console.log(req.params.id);

  movies.find({_id:id}).toArray(function(err, movie){
    res.send({movies: movie});
  });
};
