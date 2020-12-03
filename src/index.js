function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours<10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes<10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
}

function displayTemperature(response) {
  let temperature = document.querySelector(".temp");
  let cityName = document.querySelector(".city");
  let currentDate = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let weatherIcon = document.querySelector("#icon");
  let feelsLike = document.querySelector("#feels-like");
  let wind = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);
  cityName.innerHTML = response.data.name;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  wind.innerHTML = Math.round(3.6*response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
}

function search(city) {
let apiKey = "86f093aa43690ee890e5cd351bb4c53c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-current-city");
  search(cityInput.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temp");
  celsiusChange.classList.add("inactive");
  fahrenheitChange.classList.remove("inactive");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temp");
  fahrenheitChange.classList.add("inactive");
  celsiusChange.classList.remove("inactive");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector(".form-place");
form.addEventListener("submit", handleSubmit);

let fahrenheitChange = document.querySelector("#fahrenheit-change");
fahrenheitChange.addEventListener("click", displayFahrenheit);

let celsiusChange = document.querySelector("#celsius-change");
celsiusChange.addEventListener("click", displayCelsius);

search("New York");
