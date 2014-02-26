/* jshint expr:true */

'use strict';

process.env.DBNAME = 'album-test';
var expect = require('chai').expect;
var Album;
var fs = require ('fs');
var path = require('path');
var rimraf = require('rimraf');

describe('Album', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
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

  describe('new', function(){
    it('should create a new Album obj', function(){
      var obj = {};
      obj.title = 'Node Vacation';
      obj.taken = '2014-03-25';
      var a1 = new Album(obj);

      expect(a1).to.be.instanceof(Album);
      expect(a1.title).to.equal('Node Vacation');
      expect(a1.taken).to.be.instanceof(Date);
    });
  });

  describe('#addCover', function(){
    it('should add a cover to Album ', function(){
      var obj = {};
      obj.title = 'Node Vacation';
      obj.taken = '2014-03-25';
      var a1 = new Album(obj);
      var oldCover = __dirname + '/../fixtures/picnic-copy.jpg';
      var newCover = 'cover.jpg';
      a1.addCover(oldCover, newCover);
      expect(a1.cover).to.equal(path.normalize(__dirname + '/../../app/static/img/nodevacation/cover.jpg'));
    });
  });

  describe('#insert', function(){
    it('should insert Album record into db', function(done){
      var obj = {};
      obj.title = 'Node Vacation';
      obj.taken = '2014-03-25';
      var a1 = new Album(obj);
      var oldCover = __dirname + '/../fixtures/picnic-copy.jpg';
      var newCover = 'cover.jpg';
      a1.addCover(oldCover, newCover);
      a1.insert(function(err){
        expect(err).to.be.null;
        expect(a1).to.be.instanceof(Album);
        expect(a1.title).to.equal('Node Vacation');
        expect(a1).to.have.property('_id').and.be.ok;
        done();
      });
    });
  });
});
