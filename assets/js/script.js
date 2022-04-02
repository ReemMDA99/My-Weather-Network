//create api key and function variable
var apiKey ="4515771b12df194d0484c403031018ac";
var locationInput = document.querySelector("#locationInput");
var locationName = document.querySelector("#locationName");

// store city location
var locationList =[];

// get geological coordinate
var showWeather= function(locationName) {
// store api url to get geological coordinate of the city
var apiLocationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;
// get location data from api url
fetch(apiLocationUrl)
.then (function(response) {
    if(response.ok) {
        response.json()
        .then(function(data) {
            if (data[0] === null) {
                window.alert("The city name is invalid. Please enter a valid city name.");
                return;
