function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#detailed-condition");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let humidityElement = document.querySelector("#humidity");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city);
}

function formatDate(date) {

    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = `247b1tffdc3d60aa05b1o283fb0ad4ee`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&metric`;
    
    axios.get(apiUrl).then(updateWeather);
}


function updateCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

function getForecast(city) {
    let apiKey = "247b1tffdc3d60aa05b1o283fb0ad4ee";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");

    let forecastHtml = "";

    response.data.daily.forEach(function (day) {
     forecastHtml = 
      forecastHtml + 
      `
      <div class="row-one">
       <div class="col-1">
        <div class="weather-forecast-date">18:23</div>
        <div class="weather-forecast-day">Tue</div> 
        <div >
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        </div>  
        <div class="weather-forecast-temeperatures">
        <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}&deg;C</span>
        <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}&deg;C</span>
        </div>
       </div>
     </div>
   `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", updateCity);

searchCity("Klerksdorp");
displayForecast();

