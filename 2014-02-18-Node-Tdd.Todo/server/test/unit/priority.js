/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Priority;

describe('Priority', function(){

  before(function(done){
    var connectdb = require('../../app/lib/mongodb-connection-pool');
    connectdb('todo-test', function(){
      Priority = global.nss.Priority;
      done();
    });
  });
  
  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new Priority', function(){

      var obj = {name:'High', value: '3'};
      var p1 = new Priority(obj);

      expect(p1).to.be.an.instanceof(Priority);
      expect(p1).to.have.property('name').and.equal('High');
      expect(p1).to.have.property('value').and.equal(3);
    });
  });

  describe('#save', function(){
    it('should save a Priority obj into db', function(done){
      var obj = {name:'High', value: '3'};
      var p1 = new Priority(obj);

      p1.save(function(err){
        expect(err).to.be.null;
        expect(p1).to.be.instanceof(Priority);
        expect(p1.name).to.equal('High');
        expect(p1.value).to.deep.equal(3);
        expect(p1).to.have.property('_id').and.be.ok;
        done();
      });
    });

    it('should not create duplicates based on name', function(done){
      var p1 = new Priority({name:'High', value: '3'});
      var p2 = new Priority({name:'Medium', value: '2'});
      var p3 = new Priority({name:'High', value: '3'});
      
      p1.save(function(){
        p2.save(function(){
          p3.save(function(err){
            expect(err).to.be.instanceof(Error);
            expect(p3._id).to.be.undefined;
            done();
          });
        });
      });
    });

    it('should edit a Priority obj and save into db', function(done){
      var obj = {name:'High', value: '3'};
      var p1 = new Priority(obj);

      p1.save(function(){
        var id = p1._id.toString();
        console.log(id);
        Priority.findById(id, function(priority){
          priority.name = 'Medium';
          var p2 = new Priority(priority);
          p2.save(function(){
            Priority.findById(id, function(editedPriority){
              expect(editedPriority.name).to.equal('Medium');
              expect(editedPriority.value).to.equal(3);
              expect(editedPriority._id.toString()).to.equal(id);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findAll', function(){
    it('should return all priorities in the db', function(done){
      var p1 = new Priority({name:'High', value: '3'});
      var p2 = new Priority({name:'Medium', value: '2'});
      var p3 = new Priority({name:'Low', value: '1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findAll(function(priorities){
              expect(priorities).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByName', function(){
    it('should find record by name', function(done){
      var p1 = new Priority({name:'High', value: '3'});
      var p2 = new Priority({name:'Medium', value: '2'});

      p1.save(function(){
        p2.save(function(){
          Priority.findByName('High', function(priority){
            expect(priority.name).to.equal('High');
            done();
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find record by name', function(done){
      var p1 = new Priority({name:'High', value: '3'});
      var p2 = new Priority({name:'Medium', value: '2'});

      p1.save(function(){
        p2.save(function(){
          var id = p1._id.toString();
          Priority.findById(id, function(priority){
            expect(priority._id.toString()).to.equal(id);
            done();
          });
        });
      });
    });
  });

  describe('.deleteById', function(){
    it('should find record by name', function(done){
      var p1 = new Priority({name:'High', value: '3'});
      var p2 = new Priority({name:'Medium', value: '2'});

      p1.save(function(){
        p2.save(function(){
          var id = p1._id.toString();
          Priority.deleteById(id, function(priority){
            Priority.findById(id, function(foundPriority){
              expect(priority).to.equal(1);
              expect(foundPriority).to.be.null;
              done();
            });
          });
        });
      });
    });
  });

});
