//create api key and function variable
var apiKey ="859b670676ad8f4803ac613e411e8c3f";
var locationInput = document.querySelector("#locationInput");
var locationName = document.querySelector("#locationName");

// store city location
var locationList =[];
//Get location list from local storage using JSON parse

//create a function to show locations as searched by user
var showLocations = function() {
    $("#locationList").empty();
    $("#locationInput").val("");
//console log show locations
    console.log(showLocations);

//loop over location list
for (counter = 0; counter < locationList.length; counter++) {
    // create a link element to take users to list of places
    var anchorTagEl = $("<a>");
        anchorTagEl.addClass("list-group-item list-group-item-action justify-space-between align-center list-group-item-primary location");
        anchorTagEl.attr("placeName", locationList[counter]);
        anchorTagEl.text(locationList[counter]);
        $("#locationList").prepend(anchorTagEl);
    }
}
//create a click event for searching location using search button
var searchLocationBtn = document.querySelector("#searchLocationBtn");
$("#searchLocationBtn").on("click", function(event){
    event.preventDefault();
    locationName = $("#locationInput").val().trim();
    //create an alert if no location is found
    if(locationName === "") {
        alert("Please enter a location to search")
//if location list is more than 11 then use .shift and .push method
    }else if (locationList.length >=11) {
        locationList.shift();
        locationList.push(locationName);
    }else {
        locationList.push(locationName);
    }
//Call back 
    console.log(showLocations());
//Call back present weather and a 5 days forecast functions
console.log(showWeather());
console.log(showFiveDays());
});   
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
        // showWeather();
      })
    } else {
    window.alert("Sorry,no data found for " + locationName + ". Try other city.");
}
// console.log(result);
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
.text("Temperature: " + getTemp+ "° C");
todaysForecast.append(tempEl);

//Create var for current wind speed
var getWindSpeed = result.wind.speed;
var windEl = $("<p class='card-text'>")
.text("Wind: "+ getWindSpeed + "m/s");
todaysForecast.append(windEl);

//Create var for present humidity
var getHumidity = result.main.humidity;
var humidEl = $("<p class='card-text'>")
.text("Humidity: " + getHumidity + "%");
todaysForecast.append(humidEl);
}


//create uviNDEX

//create function for 5 days forecast
var showFiveDays= async function() {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q="+locationName+"&units=imperial&appid=" + apiKey;
    var result = await $.ajax ({
        url: apiURL,
        method: "GET"
    })
    //card header
    var fiveDaysDiv = $("<div id='fiveDayForecast'>");
    var cardHeader = $("<h4 class='card-header'>")
    .text("Forecast for next 5 days:");
    fiveDaysDiv.append(cardHeader);
// 5 days card deck
var fiveDaysCardDeck =("<div class='card-deck'>");
fiveDaysDiv.append(fiveDaysCardDeck);
console.log(result);
$("#fiveDaysContainer").html(fiveDaysDiv);

//loop over for 5 days weather forecast
for(counter=0; counter <5; counter++) {
    var fiveDaysCard = $("<div class='card mb-3 mt-3'>");
    var cBody = $("div class='card-body boarder-secondary'>");
// create a new date variable 
    var d= new Date();
    var today= (d.getMonth()+1) + "/" + (d.getDate()+ counter+ 1) + "/" + d.getFullYear();
    var fiveDaysDate = $("<h4 class= 'card-title text-center'>").text(today);
    cBody.append(fiveDaysDate);
//Create weather presentation icon
var getPresentWeatherIcon = result.list[counter].weather[0].icon;
console.log(getPresentWeatherIcon);

//create 5 days forecast weather icon
var showWeatherIcon = $("<img src =http://openweathermap.org/img/wn/" +getPresentWeatherIcon+ ".png>" );
cBody.append(showWeatherIcon);

//create 5 days forecast weather temp
var getTemp = result.list[counter].main.temp;
var tempEl = $("<p class='card-text'>")
.text("Temp: "+ getTemp +"° C");
cBody.append(tempEl);

//create 5 days forecast weather humidity
var getHumidity = result.list[counter].main.humidity;
var humidEl = $("<p class='card-text'>")
.text("Temp: "+ getHumidity +"%");
cBody.append(humidEl);

//create 5 days forecast weather wind speed
var getWindSpeed = result.list[counter].main.wind;
var windEl = $("<p class='card-text'>")
.text("Temp: "+ getWindSpeed +" m/s");
cBody.append(windEl);

fiveDaysCard.append(cBody);
fiveDaysCardDeck.append(fiveDaysCard);
}
}
//create a click event to show weather 
$(document).on("click", showDesiredWeather);

//create a click event to show weather 
$(document).on("click", showDesiredWeather);
var showDesiredWeather= function () {
    locationName = $(this).attr("placeName");
    showWeather();
    showFiveDays();
    console.log(locationName);
}