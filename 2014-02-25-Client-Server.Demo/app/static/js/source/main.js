(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#add').click(add);
    $('#product').click(product);
  }

  function add(){
    var num1 = $('#num1').val();
    var num2 = $('#num2').val();
    var url = '/calc/add?x='+num1+'&y='+ num2;

    $.getJSON(url, function(data){
      var sum = data.sum;
      $('#sum').prepend(sum);
    });
  }

  function product(){
    var nums = $('#prodinput').val();
    var url = '/calc/product?nums='+nums;

    $.getJSON(url, function(data){
      $('#productsum').prepend(data.sum);
    });
  }

})();

