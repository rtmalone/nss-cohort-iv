$(document).ready(initialize);


function initialize(){
  $('.number').click(displayNumber);
  $('#neg').click(negInteger);
  $('#push').click(pushToQueue);
  $('.operator').click(checkQueue);
  $('#clear').click(clear);
  $('#sum').click(function (e) {
    compute(e.target.id);
  })
  $('#push').click(toggleOperators);
}

function toggleOperators () {
  var disabled = $('.operator.disabled');

  if (disabled.length) {
    enableOperators();
  } else {
    disableOperators();
  }
};

    function enableOperators () {
      var len = $('#queue li').length;

      if (len === 2) {
        $('.operator.disabled').attr('disabled', false).removeClass('disabled');
      } else {
        return false;
      }
    };

    function disableOperators() {
      var len = $('#queue li').length;
      var conditionalOperators = ['#add', '#sub', '#mul', '#div', '#pow']
      if (len > 2) {
        $.each(conditionalOperators, function(index, elName) {
          var operator = $(elName);
          operator.attr('disabled', 'disabled').addClass('disabled');
        });
      } else {
        return false;
      }
    }

function checkQueue() {
  var operator = this.id;
  var len = $('#queue li').length;
  console.log(len);
  if ( len <= 1 ) {
      return false;
  } else if (len <= 2 || operator === 'sum'){
    console.log('hi');
      compute(operator);
  }
    else {
      return false;
 }
}

function clear() {
    $('#display').empty();
    $('#queue').empty();
    $('#display').text(0);
}

// using ids in this function for because it is more specific to the operator button
function compute(operator){
  //debugger;
  var operator = operator;
  var $lis = $('#queue li');
  var numbers = parseTags($lis);
  var result;
  
  switch(operator){
    case 'add':
      result = numbers[0] + numbers[1];
      break;
    case 'sub':
      result = numbers[1] - numbers[0];
      break;
    case 'mul':
      result = numbers[0] * numbers[1];
      break;
    case 'div':
      result = numbers[0] / numbers[1];
      break;
    case 'pow':
      result = Math.pow(numbers[1], numbers[0]);
      break;
    case 'sum':
      debugger;
      var s = 0;
       $('#queue li').each(function(index, element){
        s += parseFloat(element.innerText);
        console.log(element.innerText);
      });
      result = s;
      }
      $('#display').text(result);
      $('#queue').empty();
}

function pushToQueue(){
 var display = $('#display').text();
 $('#display').text('0');
 var $li = $('<li>');
 $li.text(display);
 $('#queue').prepend($li);
}

function displayNumber(){
  var display = $('#display').text();
  var current = this.value;
  var output;

  //Same as below: if(current === '.' && display.indexOf('.') !== -1) return;
  if(current === '.' && containsChar(display, '.')) return;

  if(display === '0' && current !== '.')
    output = current;
  else
    output = display + current;

  $('#display').text(output);

}
/*
 * JavaScript will turn a string into a number if mul by -1
  x *= -1;

 * My solution to homework for displaying a negative integer
  if(display > 0 && current === 'neg'){
    parseFloat(display);
    output = display * -1;
    $('#display').text(output);
    return;
  }
*/
function negInteger(){
  var negative = $('#display').text();
  negative *= -1;
  $('#display').text(negative);
}

