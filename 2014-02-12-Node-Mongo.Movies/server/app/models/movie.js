'use strict';

module.exports = function Movie(movie){ //movie is passed from new Movie(req.body) in movies.js
  this.name = movie.name || '';
  this.rating = movie.rating || '';
  this.runtime = parseInt(movie.runtime || 0);
  this.releaseyr = parseInt(movie.releaseyr || 0);
  this.studio = movie.studio || '';
  this.actors = movie.actors ? movie.actors.split(', ') : []; //this is an if statement; ? means 'if actors is true', do this: (else)do this. If nothing is passed to actors, returns null
  this.director = movie.director || '';
  this.poster = movie.poster || '';
};
