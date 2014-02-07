/* exported Person */
/* global Cart:false */

var Person = (function(){

  'use strict';

  function Person(name, cash){
    this.name = name;
    this.cash = cash;
    this.cart = new Cart();
  }

  Person.prototype.checkOut = function(){
    this.cash = this.cash - this.cart.total;
    this.cart.products = [];
  };

  return Person;

})();
