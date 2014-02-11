'use strict';

exports.index = function(req, res){
  res.jsonp({ok:true});
};

exports.name = function(req, res){
  res.jsonp({name: 'My name is Node. Bow before me.'});
};

exports.favcolor = function(req, res){
  res.jsonp({favcolor: 'My favorite color is green. What of it?'});
};

exports.sum = function(req, res){
  var total = parseFloat(req.params.a) + parseFloat(req.params.b);
  res.jsonp({sum:total});
};

exports.drink = function(req, res){
  var age = parseInt(req.params.age);
  var name = req.params.name;
  var temp;
  if(age<18){
    temp = ' not';
  } else if(age>18 && age<21){
    temp = ' maybe';
  } else{
    temp = '';
  }
  console.log(name);
  console.log(age);
  var response = name+' can'+temp+' drink.';

  res.jsonp({response:response});
};
