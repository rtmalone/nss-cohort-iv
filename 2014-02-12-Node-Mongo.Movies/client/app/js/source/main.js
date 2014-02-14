(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#movie').submit(createMovie);
    $('#movieTable').on('click', '.delete', deleteMovie);
    $('#movieTable').on('click', '.edit', editMovie);
    $('#movie').on('click', '#update-movie', updateMovie);
    showMovies();
    showSubmitBtn();
  }

  function showSubmitBtn(){
    $('#create-movie').css('visibility: visible');
    $('#update-movie').css('visibility: hidden');
  }

  function showUpdateBtn(){
    $('#create-movie').css('visibility: hidden');
    $('#update-moviemovie').css('visibility: visible');
  }

  function editMovie(event){
    showUpdateBtn();
    var $name = $(this).siblings('.name').text();
    var $rating = $(this).siblings('.rating').text();
    var $runtime = $(this).siblings('.runtime').text();
    var $releaseyr = $(this).siblings('.releaseyr').text();
    var $studio = $(this).siblings('.studio').text();
    var $director = $(this).siblings('.director').text();
    var $actors = $(this).siblings('.actors').text();
    var $poster = $(this).siblings('.poster').children().css('background-image').replace(/^url|[\(\)]/g, '');
    //var $id = $(this).siblings('.delete').data
    $('#name').val($name);
    $('#rating').val($rating);
    $('#time').val($runtime);
    $('#year').val($releaseyr);
    $('#studio').val($studio);
    $('#director').val($director);
    $('#actors').val($actors);
    $('#poster').val($poster);

    event.preventDefault();
  }

  function updateMovie(event){
    var data = $(this).serialize(); //serialize creates query string on all inputs in form with a name attr defined; 'this' refers to the form
    var url = window.location.origin.replace(/3000/, '4000') + '/movies';
    var type = 'PUT';
    var success = displayUpdate;   //callback function
    console.log(url);


    $.ajax({url:url, type:type, data:data, success:success});

    $('#movie input').val('');
    event.preventDefault();
  }

  function displayUpdate(){
    
  }

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
      var $deleteBtn = $('<button>');
      var $editBtn = $('<button>');

      $tdname.text(data.movies[i].name).addClass('name').attr('data-name', data.movies[i].name);
      $tdrating.text(data.movies[i].rating).addClass('rating').attr('data-rating', data.movies[i].rating);
      $tdtime.text(data.movies[i].runtime).addClass('runtime').attr('data-rating', data.movies[i].runtime);
      $tdyear.text(data.movies[i].releaseyr).addClass('releaseyr').attr('data-releaseyr', data.movies[i].releaseyr);
      $tdstudio.text(data.movies[i].studio).addClass('studio').attr('data-studio', data.movies[i].studio);
      $tdactors.text(data.movies[i].actors).addClass('actors').attr('data-actors', data.movies[i].actors);
      $tddirector.text(data.movies[i].director).addClass('director').attr('data-director', data.movies[i].director);

      $div.addClass('th').css('background-image', 'url('+data.movies[i].poster+')');
      $deleteBtn.text('Delete').addClass('tiny radius alert delete').attr('data-movieid', data.movies[i]._id);
      $editBtn.text('Edit').addClass('tiny radius edit');

      $tdposter.append($div).addClass('poster');
      $tr.append($tdname, $tdrating, $tdtime, $tdyear, $tdstudio, $tdactors, $tddirector, $tdposter, $deleteBtn, $editBtn);
      $('#movieTable > tbody').prepend($tr);
    }
  }

  function createMovie(event){
    var data = $(this).serialize(); //serialize creates query string on all inputs in form with a name attr defined; 'this' refers to the form
    var url = window.location.origin.replace(/3000/, '4000') + '/movies';
    var type = 'POST';
    var success = newMovie;   //callback function
    console.log(data);
    console.log(url);

    $.ajax({url:url, type:type, data:data, success:success});

    $('#movie input').val('');
    event.preventDefault();
  }

  function newMovie(movie){
    console.log(movie);
  }

})();

