'use strict';

var Album = require('../models/album');
//var albums = global.nss.db.collection('albums');

exports.new = function(req, res){
  res.render('albums/new', {title:'New Album'});
};

exports.create = function(req, res){
  var album = new Album(req.body);
  album.addCover(req.files.cover.path);
  album.insert(function(){
    res.redirect('/');
  });
};

