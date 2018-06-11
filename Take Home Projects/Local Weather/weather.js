 //retrieving weather
navigator.geolocation.getCurrentPosition(function(position){
  var coord = {
    lat: position.coords.latitude,
    long: position.coords.longitude
  };

$(document).ready(function(){
  
  var skycons = new Skycons({"color": "#D35435"});
  var tempType = "F";
  var forecastType = "Clear";
  var weatherLink = 'https://api.wunderground.com/api/9d3f3c2679db8cd6/conditions/q/';
  var weatherApi = 'https://api.wunderground.com/api/9d3f3c2679db8cd6/conditions/q/' + coord.lat + ',' + coord.long + '.json';
  
  skycons.play();
  
$.getJSON(weatherApi, function(result){
  
  $(".temp").html(result.current_observation.temp_f + "° F");
  
  $("#icon1").click(function(){
    if(tempType === "F"){
      $(".temp").html(result.current_observation.temp_f + "° F");
      tempType = "C";
    }
    else if(tempType === "C"){
    $(".temp").html(result.current_observation.temp_c + "° C");
    tempType = "F";
    }
  
  });
  
  forecastType = result.current_observation.weather;
  $(".forecast").html(forecastType);
  
  if(forecastType === "Partly Cloudy")
    skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
  else if(forecastType === "Clear")
    skycons.add("icon1", Skycons.CLEAR_DAY);
  else if(forecastType === "Sunny")
     skycons.add("icon1", Skycons.CLEAR_DAY);
  else if(forecastType === "Rain")
    skycons.add("icon1", Skycons.RAIN);
  else if(forecastType === "Thunderstorm")
     skycons.add("icon1", Skycons.SLEET);
  else if(forecastType === "Snow")
     skycons.add("icon1", Skycons.SNOW);
  else  skycons.add("icon1", Skycons.CLEAR_DAY);
 
  
});

  
  
  });
});
