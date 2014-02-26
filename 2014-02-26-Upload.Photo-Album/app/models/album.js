'use strict';

module.exports = Album;
var albums = global.nss.db.collection('albums');
var fs = require('fs');
var path = require('path');
//var Mongo = require('mongodb');
var albums;

function Album(album){
  //this._id = album._id
  this.title = album.title;
  this.taken = new Date(album.taken);
  //this.photos = [];
}

Album.prototype.addCover = function(oldpath){
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var newpath = __dirname + '/../static/img/' + dirname;
  fs.mkdirSync(newpath);

  var ext = path.extname(oldpath);
  newpath += '/cover' + ext;
  fs.renameSync(oldpath, newpath);

  this.cover = path.normalize(newpath);
};

Album.prototype.insert = function(fn){
  albums.insert(this, function(err, records){
    fn(err);
  });
};
