'use strict';

module.exports = Album;
var albums = global.nss.db.collection('albums');
var fs = require('fs');
var path = require('path');
var albums;

function Album(album){
  this.title = album.title;
  this.taken = new Date(album.taken);
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

Album.findAll = function(fn){
  albums.find().toArray(function(err, records){
    fn(records);
  });
};
