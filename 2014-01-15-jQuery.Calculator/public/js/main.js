
// following line tells browser to read entire html file before reading .js page
$(document).ready(initialize);

function initialize() {
  $('#calc').click(calculate);
  $('#sum').click(sum);
  $('#product').click(product);
  $('.clear').click(clear);
}

// Basic 4 function calculator
function clear() {
  $('#num1').val('');
  $('#num1').focus();
  $('#num2').val('');
  $('#op').val('');
  $('#result').text('');
  $('#spCalc1').val('');
  $('#spCalc2').val('');
  $('#spCalc3').val('');
  $('#spCalc4').val('');
  $('#spCalc5').val('');
  $('#result2').text('');
}

function calculate(){
  var num1 = $('#num1').val()
  num1 = parseFloat(num1);
  var num2 = $('#num2').val()
  num2 = parseFloat(num2);
  var op = $('#op').val()
  var result = compute(num1, num2, op);

  $('#result').text(result);
}

function compute(num1, num2, op){
  switch(op){
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
 }
    return result;
}

// Sum & Product Calculator

function sum(){
  var spCalc1 = $('#spCalc1').val()
    spCalc1 = parseFloat(spCalc1);
  var spCalc2 = $('#spCalc2').val()
    spCalc2 = parseFloat(spCalc2);
  var spCalc3 = $('#spCalc3').val()
    spCalc3 = parseFloat(spCalc3);
  var spCalc4 = $('#spCalc4').val()
    spCalc4 = parseFloat(spCalc4);
  var spCalc5 = $('#spCalc5').val()
    spCalc5 = parseFloat(spCalc5);
  var result = computeSpCalc(spCalc1, spCalc2, spCalc3, spCalc4, spCalc5);

  $('#result2').text(result);
}

function product(){
  var spCalc1 = $('#spCalc1').val()
    spCalc1 = parseFloat(spCalc1);
  var spCalc2 = $('#spCalc2').val()
    spCalc2 = parseFloat(spCalc2);
  var spCalc3 = $('#spCalc3').val()
    spCalc3 = parseFloat(spCalc3);
  var spCalc4 = $('#spCalc4').val()
    spCalc4 = parseFloat(spCalc4);
  var spCalc5 = $('#spCalc5').val()
    spCalc5 = parseFloat(spCalc5);
  var result = computeSpCalcProd(spCalc1, spCalc2, spCalc3, spCalc4, spCalc5);

  $('#result2').text(result);
}

function computeSpCalc(spCalc1, spCalc2, spCalc3, spCalc4, spCalc5){
  if (sum)
    var result = spCalc1 + spCalc2 + spCalc3 + spCalc4 + spCalc5;
  else if (product)
    var result = spCalc1 * spCalc2 * spCalc3 * spCalc4 * spCalc5;

  return result;
}

function computeSpCalcProd(spCalc1, spCalc2, spCalc3, spCalc4, spCalc5){
  if (product)
    var result = spCalc1 * spCalc2 * spCalc3 * spCalc4 * spCalc5;

  return result;
}
/*
// Alternate code for a more elegant solution
//  Use classes on inputs for Sum/Product Calculator to select all and compact the code

function sum (){
  var nums = $('.numbers');
  for(var i = 0, i > num.length, i++)
      console.log(nums[i]);
}

---------OR----------
// .each() is a jQuery loop
// .each() calls the temp function and passes in the .numbers info

function sum(){
  $('.numbers').each(temp)
}

function temp(index, element){
    console.log('---i am looping');
    console.log(index);
    console.log(element);
}
// Above console.logs just show the steps working in the console; not important to actual working code

----------OR--------
// The two above functions combined together

function sum(){
  var s = 0;
  $('.numbers').each(function(index, element){
    s += parseFloat(element.value);
  });

  $('result').text(s);
}
*/
