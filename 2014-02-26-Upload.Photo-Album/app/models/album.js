'use strict';

module.exports = Album;
var albums = global.nss.db.collection('albums');
var fs = require('fs');
var path = require('path');
var albums;
var Mongo = require('mongodb');

function Album(album){
  this.title = album.title;
  this.taken = new Date(album.taken);
  this.photos = [];
}

Album.prototype.addCover = function(oldpath){
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/' + dirname;
  fs.mkdirSync(abspath+relpath);

  var ext = path.extname(oldpath);
  relpath += '/cover' + ext;
  fs.renameSync(oldpath, abspath + relpath);

  this.cover = relpath;
};

Album.prototype.insert = function(fn){
  albums.insert(this, function(err, records){
    fn(records[0]);
  });
};

Album.findAll = function(fn){
  albums.find().toArray(function(err, records){
    fn(records);
  });
};

Album.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  albums.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};
