/* global asyncTest:false, start: false, test:false, deepEqual:false, ok:false, throws:false, Stock:false, Portfolio:false, Client:false */

'use strict';

test('Stock#new', function(){
  var s1 = new Stock('AAPL', 50, 25);

  throws (function() { s1.symbol = 'Something'; }, 'Should not be able to set symbol on s1.');
  throws (function() { s1.shares = '10'; }, 'Should not be able to set shares on s1.');
  throws (function() { s1.purchaseAmt = '15'; }, 'Should not be able to set purchaseAmt on s1.');
  ok(s1 instanceof Stock, 's1 is an instance of stock');
  deepEqual(s1.symbol, 'AAPL', 's1 should be AAPL');
  deepEqual(s1.shares, 50, 's1 should have 50 shares.');
  deepEqual(s1.purchaseAmt, 25, 's1 purchase amount should be $25.');
});


asyncTest('Stock#value', function (){
  var s1 = new Stock('AAPL', 50, 25);
  s1.value(function(val){
    ok(val > 0, 'Apple quote should be greater than $0');
    start();
  });
});

// Portfolio tests

test('Portfolio#new', function(){
  var p1 = new Portfolio ('Tech Stocks');

  ok(p1 instanceof Portfolio, 'p1 is an instance of portfolio');
  deepEqual(p1.name, 'Tech Stocks', 'p1 should have a name.');
  deepEqual(p1.stockCount, 0, 'p1 should have no stocks');
});

test('Portfolio#addStock', function(){
  var p1 = new Portfolio ('Tech Stocks');
  var s1 = new Stock('AAPL', 50, 25);
  var s2 = new Stock('AMZN', 150, 20);
  var s3 = new Stock('GOOG', 250, 30);
  var s4 = new Stock('MSFT', 350, 35);
  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);

  deepEqual(p1.stockCount, 4, 'Should have 4 stocks.');
});

test('Portfolio#getStock', function(){
  var p1 = new Portfolio ('Tech Stocks');
  var s1 = new Stock('GOOG');
  var s2 = new Stock('MSFT');
  var s3 = new Stock('AAPL');

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock(s3);

  var s5 = p1.getStock('AAPL');
  var stocks = p1.getStock(['MSFT', 'GOOG']);

  deepEqual(s5.symbol, 'AAPL', 'Find the AAPL.');
  deepEqual(stocks.length, 2, 'Length of stocks should be 3');
  deepEqual(stocks[0].symbol, 'MSFT', 'Name of stock at index 0 is MSFT');
  deepEqual(stocks[1].symbol, 'GOOG', 'Name of stock at index 1 is GOOG');
});

test('Portfolio#deleteStock', function(){
  var p1 = new Portfolio ('Tech Stocks');
  var s1 = new Stock('GOOG');
  var s2 = new Stock('MSFT');
  var s3 = new Stock('AAPL');
  var s4 = new Stock('AMZN');

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);

  var s5 = p1.deleteStock('AAPL');
  var s6 = p1.deleteStock('ZZZZ');
  var stocks = p1.deleteStock(['AMZN', 'GOOG']);

  deepEqual(p1.stockCount, 1, 'Should have 1 remaining stock.');
  deepEqual(s5.symbol, 'AAPL', 'Should find AAPL');
  ok(!s6, 'Should not find ZZZZ');
  deepEqual(stocks.length, 2, 'Should remove 2 stocks.');
  deepEqual(stocks[0].symbol, 'GOOG', 'Name of stock at index 0 is GOOG');
  deepEqual(stocks[1].symbol, 'AMZN', 'Name of stock at index 1 is AMZN');
});

// Client Tests

test('Client#new', function(){
  var c1 = new Client ('Tyler');

  ok(c1 instanceof Client, 'c1 is an instance of client');
  deepEqual(c1.name, 'Tyler', 'c1 should have a name.');
  deepEqual(c1.portfolioCount, 0, 'c1 should have no portfolios');
});


test('Client#addPortfolio', function(){
  var c1 = new Client ('Tech Stocks');
  var p1 = new Portfolio();
  var p2 = new Portfolio();
  var p3 = new Portfolio();
  var p4 = new Portfolio();

  c1.addPortfolio(p1);
  c1.addPortfolio(p2);
  c1.addPortfolio([p3, p4]);

  deepEqual(c1.portfolioCount, 4, 'Should have 4 portfolios.');
});
/*
test('Client#getPortfolio', function(){
  var c1 = new Client ();
  var p1 = new Portfolio();
  var p2 = new Portfolio();
  var p3 = new Portfolio();

  c1.addPortfolio(p1);
  c1.addPortfolio(p2);
  c1.addPortfolio(p3);

  var p5 = c1.getPortfolio();
  var porfolios = c1.getPorfolio([, ]);

  deepEqual(p5.name, '___', 'Find the ___.');
  deepEqual(portfolios.length, 2, 'Length of portfolios should be 2');
  deepEqual(portfolios[0].symbol, '', 'Name of portfolio at index 0 is ___');
  deepEqual(portfolios[1].symbol, '', 'Name of portfolio at index 1 is ___');
});

test('Client#deletePortfolio', function(){
  var c1 = new Client ('');
  var p1 = new Portfolio('');
  var p2 = new Portfolio('');
  var p3 = new Portfolio('');
  var p4 = new Portfolio('');

  c1.addPortfolio(p1);
  c1.addPortfolio(p2);
  c1.addPortfolio([p3, p4]);

  var p5 = c1.deletePortfolio('');
  var p6 = c1.deletePortfolio('ZZZZ');
  var portfolios = c1.deletePortfolio(['', '']);

  deepEqual(c1.portfolioCount, 1, 'Should have 1 remaining portfolio.');
  deepEqual(p5.name '', 'Should find ___');
  ok(!p6, 'Should not find ZZZZ');
  deepEqual(portfolios.length === 2, 'Should remove 2 portfolios.');
  deepEqual(portfolios[0].name, '___', 'Name of portfolio at index 0 is ___');
  deepEqual(portfolios[1].name, '___', 'Name of portfolio at index 1 is ___');
});
*/
