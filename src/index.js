
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


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
days.forEach(function (day) {
  forecastHTML = forecastHTML + 
  `                                        
  <div class="col-2">         
  <div class="weather-forecast-day">${day}</div>
  <img src="https://openweathermap.org/themes/openweathermap/assets/img/landing/icon-4.png" alt="" width="42" />
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperatures-max">33°</span>
  <span class="weather-forecast-temperatures-min">12°</span>
  </div>
  </div>
  `;
}); 


  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
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

function convertToFahrenheit(event){
  event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;



let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
 

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

 
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);


searchCity("London");

