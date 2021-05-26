
let now = new Date();
let h2 = document.querySelector("#date");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
h2.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}


function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
    
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
  forecastHTML = 
  forecastHTML + 
  `                                        
  <div class="col-2">         
  <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
  <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
  alt="" 
  width="42" />
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperatures-max"> ${Math.round(forecastDay.temp.max)}°</span>
  <span class="weather-forecast-temperatures-min"> ${Math.round(forecastDay.temp.min)}°</span>
  </div>
  </div>
  `;
  }
}); 


  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5bcf7fff2a57c3f50f82590866ff2fbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
document.querySelector("#city").innerHTML = response.data.name;
celsiusTemperature = response.data.main.temp;
document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
let iconElement = document.querySelector("#icon");

document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round (response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) = ``;
iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);
}

function searchCity(city){
  let apiKey = "5bcf7fff2a57c3f50f82590866ff2fbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}


function searchLocation(position){
   let apiKey = "5bcf7fff2a57c3f50f82590866ff2fbb";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

 

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

 
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);


searchCity("London");

