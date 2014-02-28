'use strict';

var Album = require('../models/album');
var moment = require('moment');

exports.new = function(req, res){
  res.render('albums/new', {title: 'New Album'});
};

exports.create = function(req, res){
  var album = new Album(req.body);
  album.addCover(req.files.cover.path);
  album.insert(function(){
    res.redirect('/');
  });
};

exports.index = function(req, res){
  Album.findAll(function(albums){
    console.log(albums);
    res.render('albums/index', {moment:moment, albums:albums, title: 'Photo Albums'});
  });
};

exports.show = function(req, res){
  console.log('here '+req.params);
  Album.findById(req.params.id, function(album){
    res.render('albums/show', {moment:moment, album:album, title:album.title});
  });
};
