(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#addphoto').click(showForm);
  }

  function showForm(){
    $('#addform').slideToggle('fast');
  }

})();

