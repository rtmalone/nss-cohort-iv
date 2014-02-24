(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#formbtn').click(showForm);
    $('#register').click(registerUser);
    $('#login').click(loginUser);
  }

  function showForm(){
    $('#userform').slideToggle('fast');
  }

  function registerUser(event){
    var data = $('#userform').serialize();
    var url = generateUrl('/users');
    var type = 'POST';
    var success = showRegMessage;

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

  function showRegMessage(status){
    if(status.isSuccess){
      alert('Registration Successful');
    } else {
      alert('Registration failed');
    }
  }

  function loginUser(event){
    var data = $('#userform').serialize();
    var url = generateUrl('/users');
    var type = 'PUT';
    var success = showLoginMessage;
    
    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

  function showLoginMessage(status){
    console.log(status);
  }

  function generateUrl(path){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000');
    url += path;
    return url;
  }

})();

