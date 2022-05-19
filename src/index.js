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
h3.innerHTML = day + "<br>" + hour + ":" + minutes;

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
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e8201d3985da616d04bf2443bbf2eeaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}


function displayWeatherCondition(response) {
  console.log(response.data);

  document.querySelector("h1").innerHTML =
    "Currently in...<br>" + response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png"
  );
  document.querySelector("h2").innerHTML =
    Math.round(response.data.main.temp) + "° <br>" + response.data.weather[0].description;
  document.querySelector("h4").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + "<br> Humidity: " + response.data.main.humidity + "%";
  
  getForecast(response.data.coord);
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
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let weatherDescription = response.data.weather[0].description;
  let h2 = document.querySelector("h2");
  let h4 = document.querySelector("h4");
  let iconElement = document.querySelector("#icon");

  h2.innerHTML = temperature + "° <br>" + weatherDescription;

  h4.innerHTML = "Wind: " + wind + "<br> Humidity: " + humidity + "%";
  iconElement.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png');

  getForecast(response.data.coord);

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
