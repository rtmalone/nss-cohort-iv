/* jshint camelcase:false  */

(function (){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#getWeather').click(getWeather);

  }

  function getWeather(){
    var url = 'http://api.wunderground.com/api/9f738019937a3c7e/conditions/q/NM/Hobbs.json?callback=?';
    $.getJSON(url, recieve);
  }

  function recieve(data){
    var temp = data.current_observation.temperature_string;
    $('h2').text(temp);
  }


})();
