/* exported Cart */

var Cart = (function(){

  'use strict';

  function Cart(){
    this.products = [];
  }

  function getTotal(products){
    //debugger;
    var prices = _.pluck(products, 'price');
    var total = _.reduce(prices, function(sum, num){
      return sum + num;
    });
    return total;
  }

  Object.defineProperty(Cart.prototype, 'total', {
    get: function(){return getTotal(this.products);}
  });

  Cart.prototype.addProduct = function(product){
    this.products.push(product);
  };

  Cart.prototype.removeProduct = function(product){
    _.pull(this.products, product);
  };

  return Cart;

})();
