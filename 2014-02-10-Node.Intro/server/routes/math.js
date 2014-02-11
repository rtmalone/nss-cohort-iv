'use strict';

var _ = require('lodash');

exports.product = function (req, res){
  var numbers = req.query.numbers.split(', ');
  var result =_.reduce(numbers, function(acc, num){return acc*num;}, 1);
  res.jsonp({product:result});
};

exports.calculateNames = function(req, res){
  var array = req.query.names.split(', ');
  var odds = _.filter(array, function(str){
      return str.length % 2 !== 0;
    });
  var number = _.reduce(odds, function(sum, num){
    return sum + num;
  });
  var result;
  if (number.length % 2 === 0){
    result = Math.pow(number.length, 3);
  } else{
    result = Math.pow(number.length, 2);
  }
  console.log(result);
};
