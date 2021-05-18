
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




function showTemperature(response) {
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(
  response.data.main.temp);

document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round (response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
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
let temperature = temperatureElement.innerHTML;
temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);


 

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit)

 
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);


searchCity("London");

