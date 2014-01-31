/* jshint unused:false */

var Shelter = (function (){

  'use strict';

  var hours;
  var animals = [];

  function Shelter(s1){
    this.name = s1;
    this.location = 'Not Defined';
    this.capacity = 0;
    this.clients = [];
  }

  Shelter.prototype.getHours = function(){
    return hours;
  };

  Shelter.prototype.setHours = function(times){
    var tmpHours = _.map(times, function(time){
      return time.day+' '+time.open+'-'+time.close;
    });

    hours = tmpHours.join(', ');
  };

  Shelter.prototype.addAnimal = function(animal){
    animals.push(animal);
  };

  Shelter.prototype.addClient = function(client){
    this.clients.push(client);
  };


  Shelter.prototype.placeAnimal = function(name){
    var tmpAnimals = _.remove(animals, function(animal){
      return animal.name === name;
    });
    return tmpAnimals[0];
  };

  Shelter.prototype.animalCount = function(){
    return animals.length;
  };

  return Shelter;


})();
