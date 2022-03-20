//current city name
function showCurrentConditions(response) {
  showDate();
  let currentTemp = Math.round(response.data.main.temp);
  let actualTemp = document.querySelector("#actual-temp");
  actualTemp.innerHTML = currentTemp;
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = currentFeelsLike;
  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = currentHumidity;
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = currentWindSpeed;
  let currentWeatherDescription = response.data.weather[0].main;
  let weatherDescription = document.querySelector(
    ".current-weather-description"
  );
  weatherDescription.innerHTML = currentWeatherDescription;
  let cityDisplayed = document.querySelector(".current-city");
  cityDisplayed.innerHTML = response.data.name;
}

function getCity(event) {
  event.preventDefault();
  let apiKey = "bb7f974b24025ddf5b2576a2a8e204ca";
  let units = "imperial";
  let citySearched = document.querySelector("#city-search");
  //let cityDisplayed = document.querySelector(".current-city");
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched.value}&units=${units}&appid=${apiKey}`;
  axios.get(weatherApi).then(showCurrentConditions);
  // if (citySearched.value.length > 0) {
  // cityDisplayed.innerHTML = `${citySearched.value.replace(
  //    /(^\w{1})|(\s+\w{1})/g,
  //    (letter) => letter.toUpperCase()
  //  )}`;
  //} else {
  //cityDisplayed.innerHTML = "<small>Please enter a city</small>";
  //}
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
  let year = now.getFullYear();
  let newFormattedTime = formatAMPM(new Date());

  let currentDate = document.querySelector(".current-date");
  currentDate.innerHTML = `<em>${day}, ${month} ${date}, ${year} - ${newFormattedTime}</em>`;
}

//change temp units
function tempInCelcius(event) {
  event.preventDefault();
  let actualTemp = document.querySelector("#actual-temp");
  actualTemp.innerHTML = 13;
  let futureTemp1 = document.querySelector("#temp-1");
  futureTemp1.innerHTML = `13&#176;C <span class="future-low-temp">/2&#176;C</span>`;
  let futureTemp2 = document.querySelector("#temp-2");
  futureTemp2.innerHTML = `13&#176;C <span class="future-low-temp">/2&#176;C</span>`;
  let futureTemp3 = document.querySelector("#temp-3");
  futureTemp3.innerHTML = `13&#176;C <span class="future-low-temp">/2&#176;C</span>`;
  let futureTemp4 = document.querySelector("#temp-4");
  futureTemp4.innerHTML = `13&#176;C <span class="future-low-temp">/2&#176;C</span>`;
  let futureTemp5 = document.querySelector("#temp-5");
  futureTemp5.innerHTML = `13&#176;C <span class="future-low-temp">/2&#176;C</span>`;
}
function tempInFahrenheit(event) {
  event.preventDefault();
  let actualTemp = document.querySelector("#actual-temp");
  actualTemp.innerHTML = 55;
  let futureTemp1 = document.querySelector("#temp-1");
  futureTemp1.innerHTML = `55&#176;F <span class="future-low-temp">/35&#176;F</span>`;
  let futureTemp2 = document.querySelector("#temp-2");
  futureTemp2.innerHTML = `55&#176;F <span class="future-low-temp">/35&#176;F</span>`;
  let futureTemp3 = document.querySelector("#temp-3");
  futureTemp3.innerHTML = `55&#176;F <span class="future-low-temp">/35&#176;F</span>`;
  let futureTemp4 = document.querySelector("#temp-4");
  futureTemp4.innerHTML = `55&#176;F <span class="future-low-temp">/35&#176;F</span>`;
  let futureTemp5 = document.querySelector("#temp-5");
  futureTemp5.innerHTML = `55&#176;F <span class="future-low-temp">/35&#176;F</span>`;
}

// on page load
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
