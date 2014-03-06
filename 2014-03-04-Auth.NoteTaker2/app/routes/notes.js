'use strict';

var Note = require('../models/note');

exports.index = function(req, res){
  Note.findByUserId(req.session.userID, function(notes){
    console.log('this is the records being sent back', notes);
    res.render('notes/index', {title: 'Notes', notes:notes});
  });
};

exports.new = function(req, res){
  res.render('notes/new', {title:'New Note'});
};

exports.create = function(req, res){
  req.body.userId = req.session.userId;
  var newNote = new Note(req.body);
  newNote.insert(function(note){
    res.redirect('/notes');
  });
};

exports.destroy = function(req, res){
  Note.deleteNote(req.params.id, function(count){
    res.redirect('/notes');
  });
};

exports.show = function(req, res){
  Note.findById(req.params.id, function(note){
    res.render('notes/show', {title:note.title, body:note.body, dateCreated:note.dateCreated, tags:note.tags});
  });
};
