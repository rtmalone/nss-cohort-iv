(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#movie').submit(createMovie);
    $('#movieTable').on('click', '.delete', deleteMovie);
    $('#movieTable').on('click', '.edit', editMovie);
    showMovies();
  }

  function editMovie(event){
    var $name = $(this).siblings('.name').text();
    console.log($name);
    $('#name').val($name);
    debugger;
    //var url = window.location.origin.replace(/3000/, '4000')+'/movies/'+movieId;
    //$.getJSON(url, popForm);

    event.preventDefault();
  }

  //function popForm(movie){
    //console.log(movie);
  //}

  function deleteMovie(event){
    var movieId = $(this).data('movieid');
    var url = window.location.origin.replace(/3000/, '4000') + '/movies/'+movieId;
    var type = 'DELETE';
    var success = removeDomElement;
    $.ajax({url:url, type:type, data:movieId, success:success});
    
    event.preventDefault();
  }

  function removeDomElement(data){
    if(data.deleted === 1){
      $('.delete[data-movieId="'+data.id+'"]').parent().remove();
    }
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
      var $div = $('<div>');
      var $tddelete = $('<button>');
      var $tdedit = $('<button>');

      $tdname.text(data.movies[i].name).addClass('name'); //.attr('data-name', data.movies[i].name);
      $tdrating.text(data.movies[i].rating).addClass('rating').attr('data-rating', data.movies[i].rating);
      $tdtime.text(data.movies[i].runtime).addClass('runtime').attr('data-rating', data.movies[i].runtime);
      $tdyear.text(data.movies[i].releaseyr).addClass('releaseyr').attr('data-releaseyr', data.movies[i].releaseyr);
      $tdstudio.text(data.movies[i].studio).addClass('studio').attr('data-studio', data.movies[i].studio);
      $tdactors.text(data.movies[i].actors).addClass('actors').attr('data-actors', data.movies[i].actors);
      $tddirector.text(data.movies[i].director).addClass('director').attr('data-director', data.movies[i].director);
      $div.css('background-image', 'url('+data.movies[i].poster+')');
      $div.addClass('th');
      $tddelete.attr('data-movieID', data.movies[i]._id);
      $tddelete.text('Delete').addClass('tiny radius alert delete');
      $tdedit.text('Edit').addClass('tiny radius edit');

      $tdposter.append($div);
      $tr.append($tdname, $tdrating, $tdtime, $tdyear, $tdstudio, $tdactors, $tddirector, $tdposter, $tddelete, $tdedit);
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

