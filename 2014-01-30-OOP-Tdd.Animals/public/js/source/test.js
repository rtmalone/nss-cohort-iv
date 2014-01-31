/* global test:false, deepEqual:false, ok:false, Clients:false, Shelter:false, Animal:false */

'use strict';

test('Shelter', function() {
  var shelter = new Shelter();
  var s1 = new Shelter();
  var string = 'my string';

  ok( shelter instanceof Shelter, 'shelter should be instance of shelter' );
  ok( s1 instanceof Shelter, 's1 should be instance of shelter' );
  ok(!( string instanceof Shelter), 'string should not be instance of shelter' );
});

test('Shelter#name', function() {
  var s1 = new Shelter('Green Hills Shelter');

  deepEqual( s1.name, 'Green Hills Shelter', 's1 should have a name' );
});

test('Shelter#location', function() {
  var s1 = new Shelter('Green Hills Shelter');
  s1.location = 'Main St.';
  var s2 = new Shelter('GHS');

  deepEqual( s1.location, 'Main St.', 's1 should have a location' );
  deepEqual( s2.location, 'Not Defined', 's2 should have a default location' );
});

test('Shelter#capacity', function() {
  var s1 = new Shelter('Green Hills Shelter');

  deepEqual( s1.capacity, 0, 's1 should have a zero capacity' );
});

test('Shelter#setHours()', function() {
  var s1 = new Shelter('Green Hills Shelter');
  s1.setHours([
    {day: 'Mon', open: '8am', close: '5pm'},
    {day: 'Wed', open: '11am', close: '2pm'},
    {day: 'Fri', open: '9am', close: '4pm'}
  ]);

  deepEqual( s1.hours, 'Mon 8am-5pm, Wed 11am-2pm, Fri 9am-4pm', 's1 should have hours set' );
});


test('Shelter#addAnimal()', function() {
  var s1 = new Shelter('Green Hills Shelter');
  var a1 = new Animal('Fido');
  s1.addAnimal(a1);

  ok(s1.animals.length === 1, 's1 should have one item in the array');
  ok(s1.animals[0] instanceof Animal, 'a1 should be instance of s1');
  deepEqual(s1.animals[0].name, 'Fido', 'Fido should exist in the shelter');
});

test('Shelter#placeAnimal()', function() {
  var s1 = new Shelter('Green Hills Shelter');
  var a1 = new Animal('Fido');
  var a2 = new Animal('Simba');
  var a3 = new Animal('Sir Charles');

  s1.addAnimal(a1);
  s1.addAnimal(a2);
  s1.addAnimal(a3);

  s1.placeAnimal('Fido');

  deepEqual(a1.name, 'Fido', 'Get Fido should be the name of this animal.');
  deepEqual(s1.animals.length, 2, 's1 should have 2 items in array');
  console.log(a1.name);
});

/* Client Tests */

test('Client', function() {
  var c1 = new Clients();

  ok( c1 instanceof Clients, 'c1 is and instance of Client');
});

test('Client#adopt', function() {
  var a1 = new Animal('Fido');
  var c1 = new Clients('Bob');

  c1.adopt(a1);

  deepEqual(c1.animals.length, 1, 'Animals for client should be 1');
  deepEqual(c1.animals[0].name, 'Fido', 'Animal name should be Fido');
});

/* Animal Tests */

test('Animal', function() {
  var a1 = new Animal();
  ok(a1 instanceof Animal, 'a1 should be instance of Animal');
});

test('Animal#name', function() {
  var a1 = new Animal('Fido');
  deepEqual(a1.name, 'Fido', 'a1 should have name of Fido');
});

test('Animal#species', function() {
  var a1 = new Animal('Fido', 'Dog');
  var a2 = new Animal('Fido');

  deepEqual(a1.species, 'Dog', 'a1 should have species of Dog');
  deepEqual(a2.species, 'Not defined.', 'a2 does not have a species');
});

test('Animal#gender', function() {
  var a1 = new Animal('Fido', 'Dog', 'Male');
  var a2 = new Animal('Fido', 'Dog');

  deepEqual(a1.gender, 'Male', 'a1 should have gender of Male');
  deepEqual(a2.gender, 'Not defined.', 'a2 does not have a gender');
});

test('Animal#age', function() {
  var a1 = new Animal('Fido', 'Dog', 'Male', 3);
  var a2 = new Animal('Fido', 'Dog', 'Male');

  deepEqual(a1.age, 3, 'a1 should have an age of 1');
  deepEqual(a2.age, 0, 'a2 does not have an age');
});
