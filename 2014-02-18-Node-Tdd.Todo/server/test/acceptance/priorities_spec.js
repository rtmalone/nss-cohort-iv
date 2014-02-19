/* jshint expr:true */

'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
var Priority;

describe('priorities', function(){

  before(function(done){
    var connectdb = require('../../app/lib/mongodb-connection-pool');
    connectdb('todo-test', function(){
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    var p1 = new Priority({name: 'High', value: '3'});
    var p2 = new Priority({name: 'Medium', value: '2'});
    var p3 = new Priority({name: 'Low', value: '1'});


    p1.save(function(){
      p2.save(function(){
        p3.save(function(){
          done();
        });
      });
    });
  });

  afterEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  /*
   describe('POST /priorities', function(){
    it('Should create a new priority', function(done){
      request(app)
      .post('/priorities')
      .send({name: 'stupid', value:'5'})
      .end(function(err, res){
        expect(res.body.name).to.equal('stupid');
        expect(res.body.value).to.deep.equal(5);
        expect(res.body._id).to.have.length(24);
        done();
      });
    });
  });
  */

  describe('GET /priorities', function(){
    it('should return all priorities in db', function(done){
      request(app)
      .get('/priorities')
      .end(function(err, res){
        expect(res.body.priorities).to.have.length(3);
        expect(res.body.priorities[0].name).to.be.ok;
        done();
      });
    });
  });
    
//---- Steven DO NOT go above here

  describe('GET /priorities/id', function(){
    it('should return priority by id', function(done){
      Priority.findByName('Low', function(p1){
        console.log(p1);
        request(app)
        .get('/priorities/'+p1._id.toString())
        .end(function(err, res){
          expect(res.body.name).to.equal('Low');
          expect(res.body.value).to.deep.equal(1);
          expect(res.body._id).to.have.length(24);
          done();
        });
      });
    });
  });

//---- Steven DO NOT go above here

  describe('DELETE /priorities/id', function(){
    it('should delete priority by id', function(done){
      Priority.findByName('Low', function(p1){
        var id = p1._id.toString();

        request(app)
        .del('/priorities/'+ id)
        .end(function(err, res){
          done();
        });
      });
    });
  });


});
