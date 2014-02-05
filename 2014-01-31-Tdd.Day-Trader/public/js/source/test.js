/* global Client:false, stop:false, Portfolio:false, asyncTest:false, start:false, test:false, throws:false, deepEqual:false, ok:false, Stock:false  */

'use strict';

test('Stock#new', function() {
  var s1 = new Stock('AAPL', 50, 25);

  throws(function(){
    s1.symbol = 'abc';
  }, 'should not be able to set symbol on s1');

  throws(function(){
    s1.purchaseAmount = 'abc';
  }, 'should not be able to set purchaseAmount on s1');

  ok(s1 instanceof Stock, 's1 should be an instance of Stock');
  deepEqual(s1.symbol, 'AAPL', 's1 should be AAPL');
  deepEqual(s1.shares, 50, 'should have 50 aapl stock');
  deepEqual(s1.purchaseAmount, 25, 'purchased s1 at $25');
});

asyncTest('Stock#value', function() {
  var s1 = new Stock('AAPL', 50, 25);
  s1.value(function(val){
    ok(val > 0, 'appl total value should be above zero');
    start();
  });
});

test('Portfolio#new', function() {
  var p1 = new Portfolio('Tech Stocks');

  ok(p1 instanceof Portfolio, 'p1 should be an instance of Portfolio');
  deepEqual(p1.name, 'Tech Stocks', 'p1 should have a name');
  deepEqual(p1.stockCount, 0, 'p1 should have no stocks');
});

test('Portfolio#addStock', function() {
  var p1 = new Portfolio('Tech Stocks');
  var s1 = new Stock('AAPL', 50, 20);
  var s2 = new Stock('AMZN', 150, 25);
  var s3 = new Stock('GOOG', 250, 30);
  var s4 = new Stock('MSFT', 350, 35);

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);

  deepEqual(p1.stockCount, 4, 'should have 4 stocks');
});

test('Portfolio#getStock', function() {
  var p1 = new Portfolio('Tech Stocks');
  var s1 = new Stock('AAPL', 50, 20);
  var s2 = new Stock('AMZN', 150, 25);
  var s3 = new Stock('GOOG', 250, 30);
  var s4 = new Stock('MSFT', 350, 35);

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);

  var s5 = p1.getStock('AAPL');
  var s6 = p1.getStock('ZZZZ');
  var stocks = p1.getStock(['AMZN', 'GOOG']);

  deepEqual(s5.symbol, 'AAPL', 'should find aapl');
  ok(!s6, 'should not find zzzz');
  deepEqual(stocks.length, 2, 'should find 2 stocks');
  deepEqual(stocks[0].symbol, 'AMZN', 'should get amzn');
  deepEqual(stocks[1].symbol, 'GOOG', 'should get goog');
});

test('Portfolio#delStock', function() {
  var p1 = new Portfolio('Tech Stocks');
  var s1 = new Stock('AAPL', 50, 20);
  var s2 = new Stock('AMZN', 150, 25);
  var s3 = new Stock('GOOG', 250, 30);
  var s4 = new Stock('MSFT', 350, 35);

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);

  var s5 = p1.delStock('AAPL');
  var s6 = p1.delStock('ZZZZ');
  var stocks = p1.delStock(['AMZN', 'GOOG']);

  deepEqual(p1.stockCount, 1, 'should have 1 remaining stock');
  deepEqual(s5.symbol, 'AAPL', 'should find aapl');
  ok(!s6, 'should not find zzzz');
  deepEqual(stocks.length, 2, 'should remove 2 stocks');
  deepEqual(stocks[0].symbol, 'AMZN', 'should get amzn');
  deepEqual(stocks[1].symbol, 'GOOG', 'should get goog');
});

test('Client#new', function() {
  var c1 = new Client('Bob Smith', '1000');

  ok(c1 instanceof Client, 'c1 should be an instance of Client');
  deepEqual(c1.name, 'Bob Smith', 'c1 should have a name');
  deepEqual(c1.portfolioCount, 0, 'c1 should have no portfolios');
});

test('Client#addPortfolio', function() {
  var c1 = new Client('Bob Smith');
  var p1 = new Portfolio('Tech Stocks');
  var p2 = new Portfolio('Health Stocks');
  var p3 = new Portfolio('Energy Stocks');
  var s1 = new Stock('AAPL', 50, 20);
  var s2 = new Stock('AMZN', 150, 25);
  var s3 = new Stock('GOOG', 250, 30);
  var s4 = new Stock('MSFT', 350, 35);
  var s5 = new Stock('AET', 10, 50);

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);
  p2.addStock(s5);
  c1.addPortfolio(p1);
  c1.addPortfolio([p2, p3]);

  deepEqual(c1.portfolioCount, 3, 'should have 3 portfolios');
});

test('Client#getPortfolio', function() {
  var c1 = new Client('Bob Smith');
  var p1 = new Portfolio('Tech Stocks');
  var p2 = new Portfolio('Health Stocks');
  var p3 = new Portfolio('Energy Stocks');
  var s1 = new Stock('AAPL', 50, 20);
  var s2 = new Stock('AMZN', 150, 25);
  var s3 = new Stock('GOOG', 250, 30);
  var s4 = new Stock('MSFT', 350, 35);
  var s5 = new Stock('AET', 10, 50);

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);
  p2.addStock(s5);
  c1.addPortfolio(p1);
  c1.addPortfolio([p2, p3]);

  var px = c1.getPortfolio('Tech Stocks');
  var py = c1.getPortfolio('Does Not Exist');
  var pz = c1.getPortfolio(['Health Stocks', 'Energy Stocks']);

  deepEqual(px.name, 'Tech Stocks', 'should find tech portfolio');
  ok(!py, 'should not find bad portfolio');
  deepEqual(pz.length, 2, 'should find 2 portfolios');
  deepEqual(pz[0].name, 'Health Stocks', 'should get health portfolio');
  deepEqual(pz[1].name, 'Energy Stocks', 'should get energy portfolio');
});

test('Client#delPortfolio', function() {
  var c1 = new Client('Bob Smith');
  var p1 = new Portfolio('Tech Stocks');
  var p2 = new Portfolio('Health Stocks');
  var p3 = new Portfolio('Energy Stocks');
  var p4 = new Portfolio('Space Stocks');
  var s1 = new Stock('AAPL', 50, 20);
  var s2 = new Stock('AMZN', 150, 25);
  var s3 = new Stock('GOOG', 250, 30);
  var s4 = new Stock('MSFT', 350, 35);
  var s5 = new Stock('AET', 10, 50);

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);
  p2.addStock(s5);
  c1.addPortfolio(p1);
  c1.addPortfolio([p2, p3, p4]);

  var px = c1.delPortfolio('Tech Stocks');
  var py = c1.delPortfolio('Does Not Exist');
  var pz = c1.delPortfolio(['Health Stocks', 'Energy Stocks']);

  deepEqual(c1.portfolioCount, 1, 'should have 1 remaining portfolio');
  deepEqual(px.name, 'Tech Stocks', 'should find tech portfolio');
  ok(!py, 'should not find bad portfolio');
  deepEqual(pz.length, 2, 'should find 2 portfolios');
  deepEqual(pz[0].name, 'Health Stocks', 'should get health portfolio');
  deepEqual(pz[1].name, 'Energy Stocks', 'should get energy portfolio');
});

asyncTest('Client#purchaseStock', function() {
  stop();
  var c1 = new Client('Bob Smith', 100000);

  c1.purchaseStock('AAPL', 50, function(stock) {
    ok(stock instanceof Stock, 'Should be a stock');
    deepEqual(stock.shares, 50, 'Should be 50 shares.');
    deepEqual(stock.symbol, 'AAPL', 'Should be AAPL');
    ok(c1.cash < 100000, 'Should have less than $100K');
    start();
  });

  var c2 = new Client('James Dean', 100000);
  c2.purchaseStock('AAPL', 25000, function(stock) {
    ok(!stock, 'Should not be a stock.');
    ok(c2.cash === 100000, 'Should have $100k');
    start();
  });
});

asyncTest('Client#sellStock', function() {
  var c1 = new Client('Bob Smith', 100000);
  var s1 = new Stock('AAPL', 50, 250);
  c1.sellStock(s1, 10, function(stock){
    ok(stock instanceof Stock, 'Should be a stock');
    deepEqual(stock.shares, 40, 'Should be 50 shares.');
    deepEqual(stock.symbol, 'AAPL', 'Should be AAPL.');
    ok(c1.cash > 100000, 'Should have less than $100k.');
    start();
  });
});
