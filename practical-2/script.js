// weatherData: This object holds hardcoded weather information for specific cities
const weatherData = {
  "Ahmedabad": { temp: 40 },
  "Mumbai": { temp: 32 },
  "Delhi": { temp: 35 },
  "Bangalore": { temp: 25 },
  "Chennai": { temp: 38 },
  "Kolkata": { temp: 34 },
  "Hyderabad": { temp: 30 },
  "Pune": { temp: 28 }
};

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

// addEventListener: Listens for a click event on the Get Weather button
getWeatherBtn.addEventListener("click", function() {
  // Fetching Weather: When the button is clicked, it retrieves the city entered by the user
  const city = cityInput.value.trim();
  
  if (!city) {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }
  
  // checks if weather data exists in weatherData
  const weather = weatherData[city];
  
  if (weather) {
    // displays the corresponding weather information
    weatherResult.textContent = `The weather in ${city} is ${weather.temp}°C`;
  } else {
    // displays message if the city is not found
    weatherResult.textContent = `Weather data for '${city}' not found.`;
  }
});

// Allow pressing Enter to get weather
cityInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    getWeatherBtn.click();
  }
});
