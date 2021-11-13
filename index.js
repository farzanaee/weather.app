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
let dateFormat = `${days[now.getDay()]}:${now.getHours()}:${now.getMinutes()}`;
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
  currentTemp.innerHTML = `☀${temp}℃`;
}
