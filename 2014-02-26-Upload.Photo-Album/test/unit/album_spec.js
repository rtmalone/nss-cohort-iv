'use strict';

process.env.DBNAME = 'album-test';
var expect = require('chai').expect;
var fs = require('fs');
var exec = require('child_process').exec;
var Album;

describe('Album', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Album = require('../../app/models/album');
      done();
    });
  });

  beforeEach(function(done){
    var imgdir = __dirname + '/../../app/static/img/test*';
    var cmd = 'rm -rf ' + imgdir;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/picnic.jpg';
      var copyfile = __dirname + '/../fixtures/picnic-copy.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      global.nss.db.dropDatabase(function(err, result){
        done();
      });
    });
  });

  describe('new', function(){
    it('should create a new Album object', function(){
      var o = {};
      o.title = 'Test Node Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      expect(a1).to.be.instanceof(Album);
      expect(a1.title).to.equal('Test Node Vacation');
      expect(a1.taken).to.be.instanceof(Date);
      expect(a1.photos).to.have.length(0);
    });
  });

  describe('#addCover', function(){
    it('should add a cover to the Album', function(){
      var o = {};
      o.title = 'Test Node Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/picnic-copy.jpg';
      a1.addCover(oldname);
      expect(a1.cover).to.equal('/img/testnodevacation/cover.jpg');
    });
  });

  describe('#insert', function(){
    it('should insert a new Album into Mongo', function(done){
      var o = {};
      o.title = 'Test Node Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/picnic-copy.jpg';
      a1.addCover(oldname);
      a1.insert(function(err){
        expect(a1._id.toString()).to.have.length(24);
        done();
      });
    });
  });

  describe('Find Methods', function(){
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

    describe('.findAll', function(){
      it('should find all the albums in the database', function(done){
        Album.findAll(function(albums){
          expect(albums).to.have.length(3);
          done();
        });
      });
    });

    describe('.findById', function(){
      it('should find record by ID', function(done){
        Album.findById(a1._id.toString(), function(album){
          expect(album._id).to.deep.equal(a1._id);
          done();
        });
      });
    });
  });

});
