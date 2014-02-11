(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#one').click(one);
    $('#two').click(two);
    $('#add').click(add);
    $('#drinkBtn').click(canDrink);
    $('#productBtn').click(product);
    $('#namesBtn').click(calculateNames);
  }
  
  function one(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/name?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function two(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/favcolor?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function add(){
    var a = $('#a').val();
    var b = $('#b').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/add/'+a+'/'+b+'?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
      $('#sum').text(data.sum);
    });
  }
  
  function canDrink(){
    var name = $('#name').val();
    var age = $('#age').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/drink/'+name+'/'+age+'?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
      $('#drinkResponse').text(data.response);
    });
  }

  function product(){
    var numbers = $('#numbers').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/product?numbers='+numbers+'&callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      console.log(data);
      $('#product-response').text();
    });
  }

  function calculateNames(){
    var names = $('#names').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/calculateNames?names='+names+'&callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      console.log(data);
    });
  }


})();

