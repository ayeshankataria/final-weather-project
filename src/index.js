function displayTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector(".temp");
  let cityName = document.querySelector(".city");
  let descriptionElement = document.querySelector("#description");
  let feelsLike = document.querySelector("#feels-like");
  let wind = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  temperature.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  wind.innerHTML = Math.round(3.6*response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
}

let apiKey = "86f093aa43690ee890e5cd351bb4c53c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);