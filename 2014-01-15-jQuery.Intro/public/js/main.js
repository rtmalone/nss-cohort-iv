
// following line tells browser to read entire html file before reading .js page
$(document).ready(initialize);

function initialize() {
  // $ means jQuery
  // $('css or jQuery selector')
  $('h3').css('color', 'red');
  $('h3').css('font-size', '30px');
  var currentH3 = $('h3').text();
  console.log(currentH3);
  $('h3').text('Welcome to JavaScript');

  $('div').css('color', 'blue');
  $('#div2').css('font-size', '9px');
  $('#div3').css('background-color', 'yellow');

  $('.c1').css({'font-family':'Helvetica', 'font-size':'50px', 'color':'darkgreen'}).text('Tyler Malone');

 // var bgcolor = prompt('What background color would you like? You may use a common name, hex color or rgb value.');
 // var usrText = prompt('What do you want the text to say?');
 // $('#div3').css('background-color', bgcolor).text(usrText)

}
