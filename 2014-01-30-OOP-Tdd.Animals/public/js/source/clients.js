/* jshint unused:false */

var Clients = (function (){

  'use strict';
  function Clients(Name){
    this.name = Name;
    this.animals = [];
  }

  Clients.prototype.adopt = function(animal){
    this.animals.push(animal);
  };

  return Clients;

})();
