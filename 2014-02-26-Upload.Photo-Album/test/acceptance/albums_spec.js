'use strict';

process.env.DBNAME = 'album-test';
var app = require('../../app/app');
var request = require('supertest');
//var expect = require('chai').expect;
var Album;
var fs = require ('fs');
//var path = require('path');
var rimraf = require('rimraf');

describe('albums', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      Album = require('../../app/models/album');
      done();
    });
  });

  beforeEach(function(done){
    var dir = __dirname + '/../../app/static/img';
    rimraf.sync(dir);
    fs.mkdirSync(dir);
    var ogFile = __dirname + '/../fixtures/picnic.jpg';
    var copyFile = __dirname + '/../fixtures/picnic-copy.jpg';
    fs.createReadStream(ogFile).pipe(fs.createWriteStream(copyFile));

    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('GET /albums/new', function(){
    it('should display the new album html page', function(done){
      request(app)
      .get('/albums/new')
      .expect(200, done);
    });
  });

  describe('POST /albums/', function(){
    it('should create a new album and send usr back to home', function(done){
      var filename = __dirname+'/../fixtures/picnic-copy.jpg';
      request(app)
      .post('/albums')
      .attach('cover', filename)
      .field('title', 'Node Vacation')
      .field('taken', '2014-02-26')
      .expect(302, done);
    });
  });
});
