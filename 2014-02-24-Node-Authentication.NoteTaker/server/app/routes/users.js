'use strict';

var User = require('../models/user');

exports.create = function(req, res){
  var user = new User(req.body);
  user.hash(function(){
    user.insert(function(u){
      if(u){
        res.send({isSuccess:true});
      } else {
        res.send({isSuccess:false});
      }
    });
  });
};

exports.login = function(req, res){
  res.send({login:true});
};
