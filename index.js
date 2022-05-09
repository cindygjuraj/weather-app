let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satursday",
];
let day = days[now.getDay()];
let h3 = document.querySelector("h3");
h3.innerHTML = day + " " + hour + ":" + minutes;

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML =
    "Currently in...<br>" + response.data.name;
  document.querySelector("h2").innerHTML =
    "🌙 <br>" + Math.round(response.data.main.temp) + "°";
}

function search(event) {
  event.preventDefault();
  let apiKey = "e8201d3985da616d04bf2443bbf2eeaa";
  let city = document.querySelector("#search-input").value;
  let units = "imperial";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("form");
form.addEventListener("click", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = "🌙 <br>" + temperature + "°";
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "e8201d3985da616d04bf2443bbf2eeaa";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(currentPosition);
