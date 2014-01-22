/* JavaScript */

console.log('hello from javascript');
console.log("Tyler Malone");

//debugger

var a = 10;
var b = 20;
var c = a + b;
var d = c * b;
var e = d * (b - a);

var power = Math.pow(2, 8);

console.log('e is ' + e);
console.log("2 to the 8th power is " + power);

var room = 8 * 12;
console.log("The room area is " + room);

//Finding volume of a Cylinder
// debugger

var radius = 5;
var height = 9;
var pi = Math.PI;
var volume = radius  * radius * height * pi;
var roundMessage = Math.round(volume)
var cylinderMessage = 'The volume of the cylinder is ' + roundMessage + ' cubic inches';
console.log(cylinderMessage);

// you are a painter
// you have a bucket which can paint 29,572 sq ft of without refilling
// every house has 3 rooms with dimensions of: 3x5, 7x9, 6,2.
// how many full houses can you paint before running out of paint?

var roomOne = 3 * 5;
var roomTwo = 7 * 9;
var roomThree = 6 * 2;
var bucket = 29572;
var house = roomOne + roomTwo + roomThree;
var fullHouse = Math.floor(bucket / house);
console.log('I can paint ' + fullHouse + ' full houses');

// you are a spaceperson
// you travel the speed of light
// you are in the andromeda galaxy
// you want to destroy justin beiber
// if you leave tomorrow
// when will you arrive to meet the bieb?
// i.e. how many days will it take you to get here?
// please hurry!

var andromeda = 2538000;
var calYear = 365;
var days = andromeda * calYear;
console.log('I will arrive in ' + days + ' days');


var firstName = prompt('Enter your first name');
console.log('Your first name is ' + firstName);

var lastName = prompt('What is you last name');
console.log('Your full name is ' + firstName + ' ' + lastName);


// Room Area with Prompts
//debugger

var l = prompt('Enter the length of your room');
 l = parseInt(l);
 
var w = prompt('Enter the width of your room');
w = parseInt(w);

var roomVolume = w * l
console.log('The area of your room is ' + roomVolume + ' feet.');

//If statements

var age = prompt('What is your age')
age = parseInt(age);
if(age < 18)
  console.log('you cannot vote');
else
  console.log('you can vote');

