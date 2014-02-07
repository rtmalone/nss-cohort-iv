/* global test:false, ok:false, Cart:false, Person:false, Product:false, deepEqual:false */

'use strict';

// Product tests -----

test('Product#new', function(){
  var p1 = new Product('ShamWow', 15);

  ok( p1 instanceof Product, 'p1 should be an instance of Product');
  deepEqual(p1.name, 'ShamWow', 'p1 should be named ShamWow');
  deepEqual(p1.price, 15, 'p1 should cost $15');
});

// Person tests ----

test('Person#new', function(){
  var r1 = new Person('Tyler', 100);

  ok( r1 instanceof Person, 'r1 should be an instance of Person');
  deepEqual(r1.name, 'Tyler', 'r1 should be named Tyler');
  deepEqual(r1.cash, 100, 'r1 should have $100');
});

// Cart tests -----

test('Cart#new', function(){
  var c1 = new Cart();

  ok( c1 instanceof Cart, 'c1 should be an instance of Cart');
  deepEqual(c1.products.length, 0, 'c1 should have no products');
});

test('Cart#addProduct', function(){
  var r1 = new Person('Tyler', 100);
  var p1 = new Product('ShamWow', 15);
  var p2 = new Product('Snuggie', 20);

  r1.cart.addProduct(p1);
  r1.cart.addProduct(p2);

  deepEqual(r1.cart.products.length, 2, 'c1 should have 2 products');
  deepEqual(r1.cart.total, 35, 'c1 should have 2 products');
});

test('Cart#removeProduct', function(){
  var r1 = new Person('Tyler', 100);
  var p1 = new Product('ShamWow', 15);
  var p2 = new Product('Snuggie', 20);
  var p3 = new Product('Egg Perfect', 10);

  r1.cart.addProduct(p1);
  r1.cart.addProduct(p2);
  r1.cart.addProduct(p3);

  r1.cart.removeProduct(p3);

  deepEqual(r1.cart.products.length, 2, 'Cart should have 2 products');
  deepEqual(p3.name, 'Egg Perfect', 'Removed item is Egg Perfect');

});

test('Person#checkOut', function(){
  var r1 = new Person('Tyler', 100);
  var p1 = new Product('ShamWow', 15);
  var p2 = new Product('Snuggie', 20);

  r1.cart.addProduct(p1);
  r1.cart.addProduct(p2);

  r1.checkOut();

  deepEqual(r1.cart.products.length, 0, 'Cart is empty');
  deepEqual(r1.cash, 65, 'Cash result should be 65');
});
