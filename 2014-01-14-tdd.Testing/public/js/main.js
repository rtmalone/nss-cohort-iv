/* MAIN js */
function add(x,y) {
  return x+y
}

function sum(numbers) {
  var result = 0;
  for ( var i = 0; i < numbers.length; i++)
    result += numbers[i];
  return result;
}

function countEvens(numbers) {
  counter = 0

  for ( var i = 0; i < numbers.length; i++)
    if(numbers[i] % 2 === 0)
      counter++;

  return counter;

  }

function makeEvenStringsUppercase(actual){
  var result = [];
  for (var i = 0; i < actual.length; i++)
    if(actual[i].length % 2 ===0)
      result.push(actual[i].toUpperCase());
    else
      result.push(actual[i]);
  return result;
}

function sumLengthOfStrings(sentence) {
  var delSp = sentence.split(' ').join('');
  return delSp.length;
}

function makeCatWithName(name) {
  var cat = {name: name};
  return cat;
}


