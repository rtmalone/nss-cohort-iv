/* jshint unused:false */

var Animal = (function (){

  'use strict';

  function Animal(Name, Species, Gender, Age){
    this.name = Name;
    this.species = Species || 'Not defined.';
    this.gender = Gender || 'Not defined.';
    this.age = Age || 0;
  }

  return Animal;

})();
