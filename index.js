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

function displayForecast () {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function(day) {
  forecastHTML = 
    forecastHTML + `
        <div class="col-2">
          <div class="weather-forecast-date">` + day + `</div>
          <img
            src="http://openweathermap.org/img/wn/10d@2x.png"
            alt=""
            width="60"
          />
          <br />
          <div class="weather-forecast-temperatures">
            <span class="weather-temperature-min">13°</span>|<span class="weather-temperature-max">14°</span>
          </div>
        </div>
      `;
  });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}



//display forecast



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
}

displayForecast();

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
