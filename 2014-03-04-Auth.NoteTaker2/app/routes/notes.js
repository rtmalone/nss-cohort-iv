'use strict';

var Note = require('../models/note');

exports.index = function(req, res){
  Note.findByUserId(req.session.userID, function(notes){
    res.render('notes/index', {title: 'Notes', notes:notes});
  });
};

/*exports.index = function(req, res){
  Note.findByUserID(user._id, function(notes){
  
  });
};*/
