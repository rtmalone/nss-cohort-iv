/* jshint unused:false */

var Stock = (function() {

  'use strict';

  var symbol, shares, purchaseAmt;

  function Stock(Symbol, Shares, PurchaseAmt) {
    symbol = Symbol;
    shares = Shares;
    purchaseAmt = PurchaseAmt;
  }

  Stock.prototype.getQuote = function(fn) { //function to be called when stock price comes back via callback
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?';
    $.getJSON(url, fn);
  };

  Stock.prototype.value = function(fn){
    this.getQuote(function(quote) { // quote Object
      var total = quote.LastPrice * shares; //LastPrice key of quote Object
      fn(total);
    });
  };

  Stock.prototype.getSymbol = function() {
    return symbol;
  };

  Stock.prototype.getShares = function() {
    return shares;
  };

  Stock.prototype.getPurchaseAmt = function() {
    return purchaseAmt;
  };

  return Stock;

})();
