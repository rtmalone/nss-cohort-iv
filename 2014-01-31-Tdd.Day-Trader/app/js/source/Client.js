/* jshint unused:false */

var Client = (function(){
  
  'use strict';

  function Client(name) {
    this.name = name;
    this._portfolios = [];
  }

  Object.defineProperty(Client.prototype, 'portfolioCount', {
    get: function(){ return this._portfolios.length; }
  });


  return Client;

})();
