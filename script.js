let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let weatherResult = document.getElementById("weatherResult");

async function getWeather() {

  let city = cityInput.value;

  if (city === "") {
    weatherResult.innerHTML = "Please enter a city";
    return;
  }

  weatherResult.innerHTML = "Loading...";

  try {

    let apiKey = "f90bf2f2827b12123392cffc017ca8e2";

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    let data = await response.json();

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>🌥️ Weather: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
    `;

  } catch (error) {
    weatherResult.innerHTML = "❌ Unable to get weather data";
  }
}

searchBtn.addEventListener("click", getWeather);
