'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  res.render('home/index', {title: 'Express Template'});
};

exports.calc = function(req, res){
  res.render('home/calc', {title: 'Intergrated Server Calculator', subtitle: 'For the Intergrated Calcing in your life.'});
};

exports.add = function(req, res){
  var sum = parseInt(req.query.x) + parseInt(req.query.y);
  res.send({sum:sum});
};

exports.product = function(req, res){
  var array = req.query.nums.split(',');
  var product = _.reduce(array, function(sum, num){
    return sum * num;
  }, 1);
  console.log('array'+array);
  res.send({sum:product});
};
