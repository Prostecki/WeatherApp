import { displayWeather, fetchData, loadWeatherData } from "./api.js";

const body = document.querySelector("body");
const weatherApp = document.querySelector(".flex-box-center-column");
const valueCityInput = document.getElementById("valueCity");

document.addEventListener("DOMContentLoaded", () => {
  //Open the page without content, just welcome modal, therefore remove it
  weatherApp.classList.remove("flex-box-center-column");
  weatherApp.classList.add("weather-app-disppearing");

  //Create welcome modal and add css class
  const welcomeModal = document.createElement("div");
  welcomeModal.classList.add("welcome-modal");

  //Create button for open weather app and add css class
  const welcomeButton = document.createElement("button");
  welcomeButton.classList.add("welcome-nextbutton");

  //Create title box and and add css class
  const headingBox = document.createElement("div");
  headingBox.classList.add("heading-box");

  //Create h1 with content and add css class
  const welcomeHeading = document.createElement("h1");
  welcomeHeading.textContent = "Weathyy";
  welcomeHeading.classList.add("welcomeModal-heading");

  //Create p element with content and add css class
  const welcomeUnderHeading = document.createElement("p");
  welcomeUnderHeading.textContent = "Weather App";
  welcomeUnderHeading.classList.add("welcome-underHeading");

  //Create img element and append source with css class
  const welcomeImg = document.createElement("img");
  welcomeImg.src = "img/umbrella_start.png";
  welcomeImg.classList.add("welcome-img");

  //Append two elements into main div with class "headingBox"
  headingBox.appendChild(welcomeHeading);
  headingBox.appendChild(welcomeUnderHeading);

  //Append all created elements into welcomModal
  welcomeModal.appendChild(welcomeImg);
  welcomeModal.appendChild(headingBox);
  welcomeModal.appendChild(welcomeButton);

  //Declare welcomeModal into body selector
  body.appendChild(welcomeModal);

  //For clearing modal and displaying weather app
  function removeWelcomePage() {
    welcomeModal.classList.add("fade-out", "hidden");
    setTimeout(() => {
      welcomeModal.remove();
    }, 500);
  }

  //listener for button in order to display the main content of weather app
  welcomeButton.addEventListener("click", () => {
    //Hide a welcome modal and display weather app as well
    removeWelcomePage();
    setTimeout(() => {
      body.appendChild(weatherApp);
      weatherApp.classList.remove("weather-app-disppearing");
      weatherApp.classList.add("flex-box-center-column");
    }, 800);
    loadWeatherData();
  });
});

valueCityInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const apiKey = "6a1dd8448eaa46809c8184729232311"; // Replace with your actual API key
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

          // Use currentData and astronomyData as needed
          displayWeather(currentData, astronomyData);
          console.log("Astronomy Data:", astronomyData);
          console.log("Current data:", currentData);

          valueCityInput.value = "";
        } catch (error) {
          console.error("Error: ", error);
          alert("Unknown location, try to enter another");
        }
      }
    }
  }
});

const themeButton = document.querySelector(".theme");
themeButton.addEventListener("click", () => {
  toggleTheme();
});

function toggleTheme() {
  const stylesheet = document.getElementById("stylesheet");

  if (stylesheet.getAttribute("href") === "styles/light.css") {
    stylesheet.setAttribute("href", "styles/dark.css");
    localStorage.setItem("theme", "dark");
    themeButton.textContent = "Light Theme";
  } else {
    stylesheet.setAttribute("href", "styles/light.css");
    localStorage.setItem("theme", "light");
    themeButton.textContent = "Dark Theme";
  }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const storedTheme = localStorage.getItem('theme');

//     if (storedTheme) {
//         const stylesheet = document.getElementById('stylesheet');
//         stylesheet.setAttribute('href', `styles/${storedTheme}.css`);
//     }
// });
