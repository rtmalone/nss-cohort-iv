'use strict';

process.env.DBNAME = 'album-test';
var app = require('../../app/app');
var request = require('supertest');
//var expect = require('chai').expect;
var fs = require('fs');
var rimraf = require('rimraf');
var Album;

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
    var imgdir = __dirname + '/../../app/static/img/test*';
    //var cmd = 'rm -rf ' + imgdir;
    rimraf.sync(imgdir);
    fs.mkdirSync(imgdir);
    var origfile = __dirname + '/../fixtures/picnic.jpg';
    var copyfile = __dirname + '/../fixtures/picnic-copy.jpg';
    fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));

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

  describe('POST /albums', function(){
    it('should create a new album and send user back to home', function(done){
      var filename = __dirname + '/../fixtures/picnic-copy.jpg';

      request(app)
      .post('/albums')
      .attach('cover', filename)
      .field('title', 'Test Node Vacation')
      .field('taken', '2014-02-25')
      .expect(302, done);
    });
  });

  describe('GET /albums/id', function(){
    var a1, a2, a3;
    beforeEach(function(done){
      a1 = new Album({title:'A', taken:'2012-03-25'});
      a2 = new Album({title:'B', taken:'2012-03-26'});
      a3 = new Album({title:'C', taken:'2012-03-27'});

      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            done();
          });
        });
      });
    });

    it('should display the new album html page', function(done){
      request(app)
      .get('/albums/' + a2._id.toString())
      .expect(200, done);
    });
  });
});
