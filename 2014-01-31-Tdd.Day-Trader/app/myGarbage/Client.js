/* exported Client */

var Client = (function(){
  
  'use strict';

  function Client(name) {
    this.name = name;
    this._portfolios = [];
  }

  Object.defineProperty(Client.prototype, 'portfolioCount', {
    get: function(){ return this._portfolios.length; }
  });

  Client.prototype.addPortfolio = function(input) {
    debugger;
    var output;
    var self = this;
    if ( typeof input === Object ) {
      output = this.portfolios = this._portfolios.push(input);
    } else {
      output = _.forEach(input, function(portfolio){
        self._portfolios.push(portfolio);
      });
    }
  };


  return Client;

})();
