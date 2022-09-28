let now = new Date();
let h2 = document.querySelector("h2");
let date = now.getDate();
console.log(now.getHours());
console.log(now.getMinutes());
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
h2.innerHTML = `Today is ${date} ${day}, ${hours}:${minutes}`;

function showTempCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  let currentTemp = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");

  cityName.innerHTML = `${city}`;
  currentTemp.innerHTML = `${temperature}°C`;
}

function retrieveCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let unit = "metric";
  let apiKey = "2c50f2cbf3eedd8d4d21b82ad8958183";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${cityInput}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTempCity);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", retrieveCity);

function showCurrentTempCity(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currentCityName = response.data.name;

  let currentTemp = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");

  currentTemp.innerHTML = `${temperature}°C`;
  currentCity.innerHTML = `${currentCityName}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2c50f2cbf3eedd8d4d21b82ad8958183";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentTempCity);
}
function handleGeolocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#location");
currentButton.addEventListener("click", handleGeolocation);
