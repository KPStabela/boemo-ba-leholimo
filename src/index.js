function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
    let apiKey = `247b1tffdc3d60aa05b1o283fb0ad4ee`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&metric`;
    
    axios.get(apiUrl).then(refreshWeather);
}


function updateCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", updateCity);

searchCity("Klerksdorp");