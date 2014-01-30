/* jshint unused:false */

var Shelter = (function (){

  'use strict';

  function Shelter(s1){
    this.name = s1;
    this.location = 'Not Defined';
    this.capacity = 0;
    this.animals = [];
  }

  Shelter.prototype.setHours = function(times){
    var hours = _.map(times, function(time){
      return time.day+' '+time.open+'-'+time.close;
    });
    this.hours = hours.join(', ');
  };

  Shelter.prototype.addAnimal = function(animal){
    this.animals.push(animal);
  };

  Shelter.prototype.placeAnimal = function(animal){
    var animals = _.remove(this.animals, function(animals){
      return animal.name === name;
    });
    return animals[0];
  };

  return Shelter;


})();
