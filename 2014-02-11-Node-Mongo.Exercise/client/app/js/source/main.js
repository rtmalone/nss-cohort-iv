(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#create-exercise').click(createExercise);
    $('#filter-exercise').click(getFilterData);
    getExercises();
  }

  function getExercises(){
    var url = window.location.origin.replace(/3000/, '4000');
    url += '/exercises';
    console.log(url);
    $.getJSON(url, displayExercises);
  }

  function getFilterData(){
    var url = window.location.origin.replace(/3000/, '4000');
    url += '/exercises';
    console.log(url);
    $.getJSON(url, filterTable);
  }

  function populateDropdown(listArray){
    var array = _.uniq(listArray);
    for(var i=0; i<array.length; i++){
      var $option = $('<option>');
      $option.text(array[i]);
      $('#dropdown').append($option);
    }
  }

  function filterTable(data){
    console.log(data);
    var filterOn = $('#dropdown').val();
    $('tbody').empty();
    for(var i=0; i<data.exercises.length; i++){
      if(data.exercises[i].name === filterOn){
        var $tr = $('<tr>');
        var $tdname = $('<td>');
        var $tdtime = $('<td>');
        var $tdcal = $('<td>');
        var $tddate = $('<td>');

        $tdname.text(data.exercises[i].name);
        $tdtime.text(data.exercises[i].time);
        $tdcal.text(data.exercises[i].calories);
        $tddate.text(data.exercises[i].date);

        $tr.append($tdname, $tdtime, $tdcal, $tddate);
        $('#exercises > tbody').append($tr);
      }
    }
  }

  function createExercise(){
    var name = $('#name').val();
    var time = $('#time').val();
    var cals = $('#cals').val();
    var date = $('#date').val();
    var url = window.location.origin.replace(/3000/, '4000');
    url += '/exercises';
    var options = {};
    options.url = url;
    options.type = 'POST';
    options.data = {name:name, time:time, calories:cals, date:date};
    options.success = exerciseCreated(name, time, cals, date);

    $.ajax(options);
  }

  function exerciseCreated(name, time, cals, date){
    var $name = $('<td>');
    var $time = $('<td>');
    var $cals = $('<td>');
    var $date = $('<td>');
    var $tr = $('<tr>');

    $name.text(name);
    $time.text(time);
    $cals.text(cals);
    $date.text(date);

    $tr.append($name, $time, $cals, $date);
    $('#exercises > tbody').prepend($tr);
  }


  function displayExercises(data){
    var listArray = [];
    for(var i=0; i<data.exercises.length; i++){
      var $tr = $('<tr>');
      var $tdname = $('<td>');
      var $tdtime = $('<td>');
      var $tdcal = $('<td>');
      var $tddate = $('<td>');

      $tdname.text(data.exercises[i].name);
      $tdtime.text(data.exercises[i].time);
      $tdcal.text(data.exercises[i].calories);
      $tddate.text(data.exercises[i].date);

      listArray.push(data.exercises[i].name);

      $tr.append($tdname, $tdtime, $tdcal, $tddate);
      $('#exercises > tbody').prepend($tr);
    }
    populateDropdown(listArray);
  }


})();

