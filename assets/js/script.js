//create api key and function variable
var apiKey ="42d2c5222d6abd6311fe0f5a07aa5041";
var locationInput = document.querySelector("#locationInput");
var locationName = document.querySelector("#locationName");
var locationContainer = document.querySelector("#locationList");
// store city location
var locationList =[];

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

//create a function to save the location array to local storage using JSON.stringify
var saveLocationArray= function() {
    localStorage.setItem("locationList", JSON.stringify(locationList));
}
//create a function to save the presently display location to local storage using JSON.stringify
var savePresentLocation = function() {
    localStorage.setItem("presentLocation", JSON.stringify(locationName));
}
//Get location list from local storage using JSON parse
var findLocationList = function() {
    var savedLocations = JSON
    .parse(localStorage.getItem("locationList"));
//incase of no saved locations
    if (savedLocations !== null) {
        locationList = savedLocations;
    }
    showLocations();
}
//call back local storage function
findLocationList();

// create a function to get present location into local storage which show after refreshing the page
var findWeather= function() {
    var savedWeather = JSON.parse(localStorage.getItem("presentLocation"));
    if (savedWeather !== null) {
        locationName= savedWeather;
    }
}
findWeather();

//Call back present location function
savePresentLocation();
//create a click event for searching location using search button
var searchLocationBtn = document.querySelector("#searchLocationBtn");
$("#searchLocationBtn").on("click", function(event){
    event.preventDefault();
    locationName = $("#locationInput").val().trim();
    //create an alert if no location is found
    if(locationName === "") {
        alert("Please enter a location to search")
//if location list is more than 13 then use .shift and .push method
    }else if (locationList.length >=13) {
        locationList.shift();
        locationList.push(locationName);
    }else {
        locationList.push(locationName);
    }
//Call back present location function
savePresentLocation();
//Call back locations locally stored in array
saveLocationArray();
//Call back location list
showLocations();
//Call back present weather
showWeather();
//Call back 5 days forecast functions
showFiveDays();
});   

// get apiLocationURL coordinate
var showWeather= async function() {
    var apiLocationURL ="https://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&units=metric&appid=" + apiKey;
    var result = await $.ajax({
        url: apiLocationURL,
        method: "GET"
    })
//     // get location data from api url
//     fetch(apiLocationURL)
//     .then(function(result) {
//     // request was successful
//     if (result.ok) {
//       result.json().then(function() {
//         showWeather();
//       })
//     } else {
//     window.alert("Sorry,no data found for " + locationName + ". Try other city.");
// }
 console.log(result);
 
//create var for latitude and longitude
var long= result.coord.lon;
var lat= result.coord.lat;

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
.text("Temperature: " + getTemp+ " ° C");
todaysForecast.append(tempEl);

//Create var for current wind speed
var getWindSpeed = result.wind.speed;
var windEl = $("<p class='card-text'>")
.text("Wind: "+ getWindSpeed + " m/s");
todaysForecast.append(windEl);

//Create var for present humidity
var getHumidity = result.main.humidity;
var humidEl = $("<p class='card-text'>")
.text("Humidity: " + getHumidity + " %");
todaysForecast.append(humidEl);

// getting UV Index info and setting color class according to value
var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" +apiKey +"&lat="+lat+"&lon="+long;
var uvResult = await $.ajax ({
    url: uvURL,
    method:"GET" 
})
//create span element to hold uv values
var getUVIndex = uvResult.value;
var uvNumber = $("<span>");
uvNumber.text(getUVIndex);

//create uvIndexEl function
var uvIndexEl = $("<p class='card-text'>").text("UV Index: ");
uvNumber.appendTo(uvIndexEl);
todaysForecast.append(uvIndexEl);
$('#weatherContainer').html(todaysForecast);

// add background color and font color to uv index data
    //UV is greater than 2
    if(getUVIndex <= 2) {
        uvNumber.addClass("favorable");
    //UV is greater than 5
    } else if (getUVIndex <=5) {
        uvNumber.addClass("moderate");
    //UV is greater than 7
    } else{
    uvNumber.addClass("severe");
}
};
//create function for 5 days forecast
var showFiveDays= async function() {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q="+locationName+"&units=metric&appid=" + apiKey;
    var result = await $.ajax ({
        url: apiURL,
        method: "GET"
    })
//5 days forecast card header
var fiveDaysDiv = $("<div id='fiveDayForecast'>");
var cardHeader = $("<h4 class='card-header'>")
.text("Forecast for next 5 Days: ");
    fiveDaysDiv.append(cardHeader);
// 5 days card deck
var fiveDaysCardDeck = $("<div class='card-deck'>");
fiveDaysDiv.append(fiveDaysCardDeck);
console.log(result);
$("#fiveDaysContainer").html(fiveDaysDiv);

//loop over for 5 days weather forecast
for(counter=0; counter <5; counter++) {
    var fiveDaysCard = $("<div class='card mb-3 mt-3'>");
    var cBody = $("<div class='card-body boarder-secondary'>");
// create a new date variable 
    var d= new Date();
    var today=(d.getMonth()+1) + "/" + (d.getDate()+ counter+ 1) + "/" + d.getFullYear();
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
.text("Humidity: "+ getHumidity +"%");
cBody.append(humidEl);

//create 5 days forecast weather wind speed
var getWindSpeed = result.list[counter].wind.speed;
var windEl = $("<p class='card-text'>")
.text("WindSpeed: "+ getWindSpeed +" m/s");
cBody.append(windEl);

fiveDaysCard.append(cBody);
fiveDaysCardDeck.append(fiveDaysCard);
}
}

var showDesiredWeather= function(e) {
    if(!e.target.matches(".location"))
    {return;}
    
    console.log("click");
    locationName = e.target.getAttribute("placeName");
    showWeather(locationName);
    showFiveDays(locationName);
    // console.log(locationName);
}
//create a click event to show desired weather 
locationContainer.addEventListener("click", showDesiredWeather);
