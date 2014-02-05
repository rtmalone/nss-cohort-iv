/* jshint unused:false */

var Portfolio = (function() {

  'use strict';

  function Portfolio(name) {
    this.name = name;
    this._stocks = [];
  }

  function findStock(symbol, stocks){
    return _.find(stocks, function(stock) {
      return symbol === stock.symbol;
    });
  }

  Object.defineProperty(Portfolio.prototype, 'stockCount', {
    get: function(){ return this._stocks.length; }
  });

  Portfolio.prototype.addStock = function(input){
    this._stocks = this._stocks.concat(input);
  };

  Portfolio.prototype.getStock = function(input){  // 'AAPL' is the parameter
    var output;
    var self = this;

    if (typeof input === 'string') {
      output = findStock(input, this._stocks);
    } else {
      output = _.map(input, function(symbol) {
        return findStock(symbol, self._stocks);
      });
    }
    return output;

  };

  Portfolio.prototype.deleteStock = function(input){  // 'AAPL' is the parameter
    var stocks = [].concat(input);

    var output = _.remove(this._stocks, function(stock) {
      return _.contains(stocks, stock.symbol);
    });

    if(typeof input === 'string') {
      output = output[0];
    }

    return output;
  };

  return Portfolio; //Factories design pattern

})();
