function formatWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForcast(response) {
  console.log(response.data.daily);
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");

  let forecastHTML = `<div class="row justify-content-evenly">`;
  forcast.forEach(function (forcastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-sm-2 forcast-col">
    <img
      src="images/${forcastDay.weather[0].icon}.png"
      alt="${forcastDay.weather[0].description}"
      class="future-weather-icon"
      id="future-weather-icon"
    />
    <p class="future-temp">
      <span class="future-high-temp"> ${Math.round(
        forcastDay.temp.max
      )}°F</span>
      <span class="future-low-temp">/${Math.round(forcastDay.temp.min)}°F</span>
      <br />
      <span class="weekday">${formatWeekday(forcastDay.dt)}</span>
    </p>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forcastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bb7f974b24025ddf5b2576a2a8e204ca";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForcast);
}

function showCurrentConditions(response) {
  showDate();
  //getWeatherIcon(response);
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = Math.round(response.data.main.temp);
  let actualTemp = document.querySelector("#actual-temp");
  actualTemp.innerHTML = fahrenheitTemperature;

  feelsLikeTemperature = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = feelsLikeTemperature;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = windSpeed;

  let weatherDescription = document.querySelector(
    ".current-weather-description"
  );
  weatherDescription.innerHTML = response.data.weather[0].description;

  let cityDisplayed = document.querySelector(".current-city");
  cityDisplayed.innerHTML = response.data.name;

  getForecast(response.data.coord);
}

function getCity(event) {
  event.preventDefault();
  let apiKey = "bb7f974b24025ddf5b2576a2a8e204ca";
  let units = "imperial";
  let citySearched = document.querySelector("#city-search");
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched.value}&units=${units}&appid=${apiKey}`;
  axios.get(weatherApi).then(showCurrentConditions);
  document.querySelector("#city-search-form").reset();
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bb7f974b24025ddf5b2576a2a8e204ca";
  let units = "imperial";
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(weatherApi).then(showCurrentConditions);
}

function locate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

//current date
function showDate() {
  let now = new Date();
  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
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
    "December",
  ];

  let month = months[now.getMonth()];
  let date = now.getDate();
  //let year = now.getFullYear();
  let newFormattedTime = formatAMPM(new Date());

  let currentDate = document.querySelector(".current-date");
  currentDate.innerHTML = `<small>Last Updated:</small><br /> <em>${day}, ${month} ${date} - ${newFormattedTime}</em>`;
}

//change temp units
function tempInCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let actualTemp = document.querySelector("#actual-temp");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  actualTemp.innerHTML = Math.round(celciusTemperature);
  let celciusFeelsLike = ((feelsLikeTemperature - 32) * 5) / 9;
  let feelsLikeUnits = document.querySelector("#feels-like-units");
  feelsLikeUnits.innerHTML = ` ${Math.round(celciusFeelsLike)}°C`;
  let kilometers = windSpeed * 1.609;
  let currentWindSpeedUnits = document.querySelector("#wind-speed-units");
  currentWindSpeedUnits.innerHTML = ` ${Math.round(kilometers)} km/h`;
}
function tempInFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let actualTemp = document.querySelector("#actual-temp");
  actualTemp.innerHTML = Math.round(fahrenheitTemperature);
  let feelsLikeUnits = document.querySelector("#feels-like-units");
  feelsLikeUnits.innerHTML = ` ${feelsLikeTemperature}°F`;
  let currentWindSpeedUnits = document.querySelector("#wind-speed-units");
  currentWindSpeedUnits.innerHTML = ` ${windSpeed} mph`;
}

// on page load
let fahrenheitTemperature = null;
let feelsLikeTemperature = null;
let windSpeed = null;

showDate();
let apiKey = "bb7f974b24025ddf5b2576a2a8e204ca";
let units = "imperial";
let city = "Nashville";
let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
axios.get(weatherApi).then(showCurrentConditions);

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", getCity);

let celcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");

celcius.addEventListener("click", tempInCelcius);
fahrenheit.addEventListener("click", tempInFahrenheit);

let currentLocationButton = document.querySelector(".current-btn");
currentLocationButton.addEventListener("click", locate);
