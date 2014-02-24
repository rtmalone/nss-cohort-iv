'use strict';

module.exports = User;

var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');

function User(user){
  this.email = user.email;
  this.password = user.password;
}


User.prototype.hash = function(fn){
  var self = this;
  bcrypt.hash(this.password, 8, function(err, hash){
    self.password = hash;
    fn();
  });
};

User.prototype.insert = function(fn){
  var self = this;

  users.findOne({email:this.email}, function(err, user){
    if(!user){
      users.insert(self, function(err, record){
        fn({success:true});
      });
    }else{
      fn(null);
    }
  });
};

