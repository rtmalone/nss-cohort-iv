/* jshint unused:false */

var Portfolio;

function portfolioFactory(name) {

  'use strict';

  var stocks = [];

  function PortfolioFn(name) {
    this.name = name;
  }

  Portfolio = PortfolioFn;

  Portfolio.prototype.stockCount = function (){
    return stocks.length;
  };

  Portfolio.prototype.addStock = function (s1){
    stocks.push(s1);
  };

  return new PortfolioFn(name); //Factories design pattern

}
