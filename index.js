let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dateFormat = `${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
let datePlacement = document.querySelector("#date");
datePlacement.innerHTML = `${dateFormat}`;

//challenge 2
function cityUpdate(event) {
  event.preventDefault();
  let input = document.querySelector("#location");
  let cityPlacement = document.querySelector("#city");

  cityPlacement.innerHTML = `${input.value}`;
  let city = input.value;
  let apiKey = `44c9a788f03ef7c8a30b92658d1157c7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("form");
form.addEventListener("submit", cityUpdate);

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temp}℃`;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let cityPlacement = document.querySelector(".city");

  celsiusTemperature = response.data.main.temp;
  celsiusWind = response.data.wind.speed;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  cityPlacement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = `44c9a788f03ef7c8a30b92658d1157c7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//unit conversions
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind");

  celsiusLink.classList.remove("active");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  windElement.innerHTML = `Wind: ${Math.round(celsiusWind * 0.621371)} mph`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(celsiusWind)} km/h`;
}
