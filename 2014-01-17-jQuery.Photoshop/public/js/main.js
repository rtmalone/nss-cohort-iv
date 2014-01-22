$(document).ready(initialize);


function initialize(){
  $('#add-color').click(addColor);
  $('#add-pixels').click(clickAddPixels);
  $('#colors').on('click', '.color', clickSelector);
  $('#pixels').on('mouseover', '.pixel', hoverColorPixel);
}

function hoverColorPixel(){
  var color = $('.selected').css('background-color');
  $(this).css('background-color', color);
}

function clickAddPixels(){
  var num = $('#number-text').val();
  num = parseInt(num);

  for(var i = 0; i < num; i++){
    var $pixel = $('<div>');
    $pixel.addClass('pixel');
    $('#pixels').prepend($pixel);
  }
}

function clickSelector(){
  if ($(this).hasClass('selected')){
     $(this).removeClass('selected');
  }
  else {
    $('.color').removeClass('selected');
    $(this).addClass('selected');
  }
}

function addColor(){
  var color = $('#color-text').val();
  $('#color-text').val('');
  $('#color-text').focus();

  var $colorBox = $('<div>');
  $colorBox.addClass('color');
  $colorBox.css('background-color', color);
  
  $('#colors').prepend($colorBox);
}

