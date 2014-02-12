(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#movie').submit(createMovie);
    showMovies();
  }

  function showMovies(){
    var url = window.location.origin.replace(/3000/, '4000') + '/movies';
    console.log(url);
    $.getJSON(url, displayMovies);
  }

  function displayMovies(data){
    console.log(data);
    for(var i=0; i<data.movies.length; i++){
      var $tr = $('<tr>');
      var $tdname = $('<td>');
      var $tdrating = $('<td>');
      var $tdtime = $('<td>');
      var $tdyear = $('<td>');
      var $tdstudio = $('<td>');
      var $tdactors = $('<td>');
      var $tddirector = $('<td>');
      var $tdposter = $('<td>');
      //var $posterURL;
      var $div = $('<div>');
      //var $a = $('<a>');

      $tdname.text(data.movies[i].name);
      $tdrating.text(data.movies[i].rating);
      $tdtime.text(data.movies[i].runtime);
      $tdyear.text(data.movies[i].releaseyr);
      $tdstudio.text(data.movies[i].studio);
      $tdactors.text(data.movies[i].actors);
      $tddirector.text(data.movies[i].director);
      $div.css('background-image', 'url('+data.movies[i].poster+')');
      $div.addClass('th');

      $tdposter.append($div);
      $tr.append($tdname, $tdrating, $tdtime, $tdyear, $tdstudio, $tdactors, $tddirector, $tdposter);
      $('#movieTable > tbody').prepend($tr);
    }
  }

  function createMovie(event){
    var data = $(this).serialize(); //serialize creates query string on all inputs in form with a name attr defined; 'this' refers to the form
    var url = window.location.origin.replace(/3000/, '4000') + '/movies';
    var type = 'POST';
    var success = newMovie;   //callback function
    console.log(url);

    $.ajax({url:url, type:type, data:data, success:success});

    $('#movie input').val('');
    event.preventDefault();
  }

  function newMovie(movie){
    console.log(movie);
  }

})();

