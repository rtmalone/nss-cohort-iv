/* global portfolioFactory: false, start:false, test:false, Portfolio:false, asyncTest:false, deepEqual:false, ok:false, Stock:false */

'use strict';

test('Stock#new', function(){
  var s1 = new Stock('AAPL', 50, 25);

  ok(s1 instanceof Stock, 's1 is an instance of stock');
  deepEqual(s1.getSymbol(), 'AAPL', 'AAPL is the symbol');
  deepEqual(s1.getShares(), 50, 'Shares should equal 50');
  deepEqual(s1.getPurchaseAmt(), 25, 's1 should equal 25');
});

// asyncTest() is used instead of test when an asyncronous test needs to be performed
asyncTest('Stock#currentPrice', function (){
  var s1 = new Stock('AAPL', 50, 25);
  s1.getQuote(function(quote){ //callback function: waits for callback from getJSON to return
    ok(quote.LastPrice > 0, 'Apple quote should be greater than $0');
    start();
  });
});

asyncTest('Stock#value', function (){
  var s1 = new Stock('AAPL', 50, 25);
  s1.value(function(value){
    ok(value > 0, 'Apple quote should be greater than $0');
    start();
  });
});

/* Portfolio tests */

test('Portfolio#new', function(){
  var p1 = portfolioFactory('Tech Stocks');

  ok(p1 instanceof Portfolio, 'p1 is an instance of portfolio');
  deepEqual(p1.name, 'Tech Stocks', 'p1 should have a name.');
  deepEqual(p1.stockCount(), 0, 'p1 should have no stocks');
});

test('Portfolio#addStock', function(){
  var p1 = portfolioFactory('Tech Stocks');
  var s1 = new Stock('AAPL', 10, 20);
  p1.addStock(s1);

  ok(s1 instanceof Stock, 's1 is instance of Stock');
  deepEqual(p1.stocks.length, 1, 's1 has a stock.');
});
