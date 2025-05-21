// Function to fetch data using XMLHttpRequest and return a Promise
export function fetchData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () =>
      xhr.status === 200
        ? resolve(JSON.parse(xhr.responseText))
        : reject(xhr.statusText);
    xhr.onerror = () => reject("Network error occurred");
    xhr.send();
  });
}

// Function to display weather data
export function displayWeather(data, astronomyData) {
  const { current, location, astronomy } = data;
  const elements = {
    location: document.getElementById("location"),
    localTime: document.getElementById("localTime"),
    temperature: document.getElementById("temperature"),
    conditionText: document.querySelector(".condition-text"),
    conditionImg: document.querySelector(".condition-img"),
    feelslike: document.querySelector(".feelslike-c"),
    feelslikeF: document.querySelector(".feelslike-f"),
    humidity: document.querySelector(".humidity"),
    wind: document.querySelector(".wind"),
    sunrise: document.querySelector(".sunrise"),
    sunset: document.querySelector(".sunset"),
    uv: document.querySelector(".uv"),
    vixibility: document.querySelector(".visibility"),
  };

  elements.temperature.textContent = `${current.temp_c}°C`;
  elements.location.textContent = `${location.name}, ${location.country}`;
  elements.localTime.textContent = `${location.localtime}`;
  elements.conditionText.textContent = `${current.condition.text}`;
  elements.conditionImg.src = `${current.condition.icon}`;
  elements.feelslike.textContent = `Feels like: ${current.feelslike_c}°C`;
  elements.feelslikeF.textContent = `Feels like: ${current.feelslike_f}F`;
  elements.humidity.textContent = `Humidity: ${current.humidity}%`;
  elements.wind.textContent = `Wind: ${current.wind_kph} km/h`;
  elements.uv.textContent = `UV: ${current.uv}`;
  elements.vixibility.textContent = `Visibility: ${current.vis_km} km`;

  // Display astronomy data
  if (astronomyData && astronomyData.astro) {
    const { sunrise, sunset } = astronomyData.astro;

    console.log("Astronomy Data:", astronomyData);
    console.log("Sunrise:", sunrise);
    console.log("Sunset:", sunset);

    elements.sunrise.textContent = `Sunrise: ${sunrise}`;
    elements.sunset.textContent = `Sunset: ${sunset}`;
  }

  // Save both weather and astronomy data to localStorage
  const combinedData = { ...data, astronomy: astronomyData };
  localStorage.setItem("weatherData", JSON.stringify(combinedData));
}

// Function to load weather data
export function loadWeatherData() {
  const storedWeatherData = localStorage.getItem("weatherData");
  if (storedWeatherData) {
    const data = JSON.parse(storedWeatherData);
    const astronomyData = data.astronomy;
    delete data.astronomy; // Remove the astronomy property to restore original structure
    displayWeather(data, astronomyData);
  } else {
    console.log("No weather data found. Please perform a search.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("btnSubmit");
  const valueCityInput = document.getElementById("valueCity");

  // Function to handle weather data fetching
  const fetchDataAndDisplayWeather = async () => {
    const apiKey = "6a1dd8448eaa46809c8184729232311";
    const baseUrl = "https://api.weatherapi.com/v1";

    if (valueCityInput) {
      let valueCity = valueCityInput.value;

      if (valueCity === "" || !isNaN(valueCity)) {
        alert("Insert a city!");
      } else {
        const currentApiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${valueCity}`;
        const astronomyApiUrl = `${baseUrl}/astronomy.json?key=${apiKey}&q=${valueCity}`;

        try {
          const [currentData, astronomyData] = await Promise.all([
            fetchData(currentApiUrl),
            fetchData(astronomyApiUrl),
          ]);
          displayWeather(currentData, astronomyData); // Fixed: passing astronomyData
          console.log("Current Data:", currentData);
          console.log("Astronomy Data:", astronomyData);
        } catch (error) {
          console.error("Error:", error);
          alert("Unknown location, try to enter another");
        }
      }
    }
  };

  // Event listener for the button click
  submitButton.addEventListener("click", fetchDataAndDisplayWeather);

  // Event listener for 'Enter' key press in the input field
  valueCityInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      await fetchDataAndDisplayWeather();
    }
  });
  loadWeatherData();
});
