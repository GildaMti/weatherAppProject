//let city = prompt("Enter a city");
//let weather = {
//paris: {
//name: "paris",
//temp: 19.7,
//humidity: 80
// },
//tokyo: {
//name: "tokyo",
//temp: 17.3,
//humidity: 50
//},
//lisbon: {
//name: "lisbon",
//temp: 30.2,
//humidity: 20
//},
//sanfrancisco: {
//name: "san francisco",
//temp: 20.9,
//humidity: 100
//},
//moscow: {
//temp: -5,
//humidity: 20
//}
//};
//if (weather[city] !== undefined) {
//let temperature = weather[city].temp;
//let humidity = weather[city].humidity;
//let fahrenheit = Math.round((temperature * 9) / 5 + 32);
//let roundtemp = Math.round(temperature);

//alert(
//"It is " +
//roundtemp +
//"°C (" +
//fahrenheit +
//"°F) in " +
//city +
//" with a humidity of " +
//humidity +
//"%"
//);
//} else {
//alert(
//"Sorry, we dont know the weather for this city. Try going to https://google.com/search?q=weather" +
//city
//);
//}
let now = new Date();

function formatTime(time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `  ${hours}:${minutes}`;
}
function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentYear = now.getFullYear();
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();

  let formattedDate = `${currentDate}, ${currentMonth} ${currentYear}`;

  return formattedDate;
}

let currently = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let fullday = document.querySelector("#date-time");
fullday.innerHTML = formatTime();
let fullday2 = document.querySelector("#date-time2");
fullday2.innerHTML = formatDate();

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
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "44755b27aa477a02b4ded4f2c0886965";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let srch = document.querySelector("#cityy");
  let srch2 = document.querySelector("#city2");
  srch2.innerHTML = srch.value;

  let apiKey = "44755b27aa477a02b4ded4f2c0886965";

  let city = `${srch.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let citySearch = document.querySelector("#searching");
citySearch.addEventListener("click", search);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempt");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempt");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function showWeather(response) {
  let currcityname = document.querySelector("#cityy");
  currcityname.innerHTML = response.data.name;

  let currcityname2 = document.querySelector("#city2");
  currcityname2.innerHTML = response.data.name;

  let currtemperature = document.querySelector("#tempt");
  currtemperature.innerHTML = Math.round(response.data.main.temp);

  let currdescription = document.querySelector("#prec");
  currdescription.innerHTML = `description :  ${response.data.weather[0].description}`;

  let currHumidity = document.querySelector("#Humid");
  currHumidity.innerHTML = `humidity :  ${response.data.main.humidity}`;

  let currWind = document.querySelector("#windy");
  currWind.innerHTML = `wind speed :  ${Math.round(response.data.wind.speed)}`;

  let icon = response.data.weather[0].icon;
  let iconimage = document.querySelector("#today-icon");
  iconimage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function retrievePosition(position) {
  let apiKey = "44755b27aa477a02b4ded4f2c0886965";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function currentCityFunc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentCityBut = document.querySelector("#currentingcity");
currentCityBut.addEventListener("click", currentCityFunc);
