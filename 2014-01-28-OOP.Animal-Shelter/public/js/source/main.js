/* global Animal: false, animalFactory: false */

(function(){

  'use strict';

  $(document).ready(initialize);

  var animals = [];

  function initialize(){
    $('input', 'textarea').focusin(focusInput);
    $('input', 'textarea').blur(blurInput);
    $('#addPhoto').click(addPhoto);
    $('#addAnimal').click(addAnimal);

    animals = animalFactory();
    addToTable();
  }

  function addToTable(){
    for(var i=0; i<animals.length; i++){
      var $div = $('<div>');
      var $tr = $('<tr>');

      var $td1 = $('<td>');
      $td1.text(animals[i].name);

      var $td2 = $('<td>');
      $td2.text(animals[i].species);
      
      var $td3 = $('<td>');
      $td3.text(animals[i].color);
      
      var $td4 = $('<td>');
      $td4.text(animals[i].age);
      
      var $td5 = $('<td>');
      $td5.text(animals[i].gender);
      
      var $td6 = $('<td>');
      $td6.text(animals[i].description);
      
      var $td7 = $('<td>');
      $td7.append($div);
      
      $tr.append($td1, $td2, $td3, $td4, $td5, $td6, $td7);
      $('tbody').append($tr);
      
      if (animals[i].photos.length > 1){
        addPhotos(i);
      } else {
        $div.css('background-image', animals[i].photos).addClass('th');
      }
    }
  }

  function addPhotos(x){
    for(var i=0; i<animals[x].photos.length; i++){
      var $div = $('<div>');
      $div.css('background-image', animals[x].photos[i]).addClass('th');
      $('tbody > tr:last-child > td:last-child').append($div);
    }
  }

  function addPhoto(event){
    var url = $('#photo').val();
    var $div = $('<div>');
    $div.addClass('th radius');
    $div.css('background-image', 'url('+url+')');
    $('#photos').append($div);

    event.preventDefault();

    $('#photo').val('');
    $('#photo').focus();
  }

  function addAnimal(event){
    var name = $('#name').val();
    var age = $('#age').val() * 1;
    var gender = $('#gender').val();
    var color = $('#color').val();
    var species = $('#species').val();
    var description = $('#description').val();
    var photos = getPhotos();

    var animal = new Animal(name, age, gender, color, description, photos, species);
    animals.push(animal);

    event.preventDefault();
  }

  function getPhotos(){
    var $divs = $('#photos > div');
    return  _.map($divs, function(div) {
      return $(div).css('background-image');
    });
  }

  function focusInput(){
    $(this).css('background-color', 'yellow');
  }

  function blurInput(){
    $(this).css('background-color', 'white');
  }

})();

