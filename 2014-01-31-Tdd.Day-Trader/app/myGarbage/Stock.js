/* jshint unused:false */

var Stock = (function() {

  'use strict';


  function Stock(Symbol, Shares, PurchaseAmt) {
    this._symbol = Symbol;
    this._shares = Shares;
    this._purchaseAmt = PurchaseAmt;
  }
  //getter function: Purpose is to solely get a property
  Object.defineProperty(Stock.prototype, 'symbol', {
    get: function(){
      return this._symbol;
    }
  });

  Object.defineProperty(Stock.prototype, 'shares', {
    get: function(){
      return this._shares;
    }
  });

  Object.defineProperty(Stock.prototype, 'purchaseAmt', {
    get: function(){
      return this._purchaseAmt;
    }
  });


  Stock.prototype.value = function(fn){
    var self = this;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + this.symbol + '&callback=?';
    $.getJSON(url, function(quote){
      var total = quote.LastPrice * self.shares;
      fn(total);
    });
  };


  return Stock;

})();

