//create api key and function variable
var apiKey ="4515771b12df194d0484c403031018ac";
var locationInput = document.querySelector("#locationInput");
var locationName = document.querySelector("#locationName");

// store city location
var locationList =[];

// get apiLocationURL coordinate
var showWeather= async function() {
    var apiLocationURL ="https://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&units=metric&appid=" + apiKey;
    var result = await $.ajax({
        url: apiLocationURL,
        method: "GET"
    })
    // get location data from api url
    fetch(apiLocationURL)
    .then(function(result) {
    // request was successful
    if (result.ok) {
      result.json().then(function() {
        showWeather();
      })
    } else {
    window.alert("Sorry,no data found for " + locationName + ". Try other city.");
}
console.log(result);
});
//create var for latitude and longitude
var long = result.coord.lon;
var lati = result.coord.lat;

//create a var for current date
var d = new Date(); 
var today = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();

//using jQuery create var elements to run open weather api
var todaysForecast = $("<div class='card-body' id='currentWeather'>");
var getPresentLocation = result.name;

//Create present weather icon and display icon function
var getPresentWeatherIcon = result.weather[0].icon;
var showPresentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getPresentWeatherIcon + "@2x.png />");

//Create var for present location
var presentLocationEl = $("<h3 class='card-body'>")
.text(getPresentLocation+"("+today+")");
presentLocationEl.append(showPresentWeatherIcon);
todaysForecast.append(presentLocationEl);

//Create var for present temperature
var getTemp = result.main.temp;
var tempEl = $("<p class='card-text'>")
.text("Temperature: " +getTemp+ "° C");
todaysForecast.append(tempEl);

//Create var for current wind speed
var getWindSpeed = result.wind.speed;
var windEl = $("<p class='card-text'>")
.text("Wind: "+getWindSpeed+" m/s");
todaysForecast.append(windEl);

//Create var for present humidity
var getHumidity = result.main.humidity;
var humidEl = $("<p class='card-text'>")
.text("Humidity: " + getHumidity + "%");
todaysForecast.append(humidEl);
}
