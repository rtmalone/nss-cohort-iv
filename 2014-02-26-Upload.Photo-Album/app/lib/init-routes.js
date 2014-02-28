'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var albums = require('../routes/albums');

  app.get('/', d, albums.index);
  app.post('/albums', d, albums.create);
  app.get('/albums/new', d, albums.new);
  app.get('/albums/:id', d, albums.show);
  console.log('Routes Loaded');
  fn();
}
