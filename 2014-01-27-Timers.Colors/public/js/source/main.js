(function (){

  'use strict';

  $(document).ready(init);

  var timer;

  function init(){
    //setTimeout(alertMe, 5000);
    $('#start').click(start);
    $('#stop').click(stop);
    $('#reset').click(reset);
  }

  function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var a = Math.random();

    var color = 'rgba('+r+','+g+','+b+','+a+')';
    return color;
  }

  function start(){
    clearInterval(timer);
    timer =  setInterval(makeColorBox, 100);
  }

  function makeColorBox(){
    var $div = $('<div>');
    $div.addClass('box');
    $div.css('background-color', randomColor());
    $('body').css('background-color', randomColor());
    $('#container').prepend($div);
  }

  function stop(){
    clearInterval(timer);
  }

  function reset(){
    $('#container').empty();
    $('body').css('background-color', '#fff');
  }

  //function alertMe(){
    //alert('Called by a timer');
  //}

  

})();
