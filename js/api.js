document.addEventListener('DOMContentLoaded', () => {

    const submitButton = document.getElementById('btnSubmit');
    
    // Wait for the DOM content to be fully loaded before executing the script
    submitButton.addEventListener('click', () => {
        //Weather API key for authentication
        const apiKey = '6a1dd8448eaa46809c8184729232311';
        //Base URL for the Weather API
        const baseUrl = 'https://api.weatherapi.com/v1';
        //Get the value of the city from the input field
        const valueCityInput = document.getElementById('valueCity');
    
            if (valueCityInput) { 
                let valueCity = valueCityInput.value;
    
            //Checks if valueCity is an empty string || Checks if valueCity is not a number.
            if (valueCity === '' || !isNaN(valueCity)) {
                alert('Insert a city!');
                valueCity = '';
            } else {
    
            //Construct the full API URL with parameters using the input city
            const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${valueCity}`;
    
            //Use the fetchData function to get weather data
            fetchData(apiUrl)
                .then((data) => {
                    //Extract location and temperature from the data
                    const locationElement = document.getElementById('location');
                    const temperatureElement = document.getElementById('temperature');
                    const conditionTextElement = document.querySelector('.condition-text');
                    const conditionImgElement = document.querySelector('.condition-img');
                    const feelslikeElement = document.querySelector('.feelslike-c');
                    const humidityElement = document.querySelector('.humidity');
    
                    //Update HTML elements with weather information
                    temperatureElement.textContent = `${data.current.temp_c}°C`;
                    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
                    conditionTextElement.textContent = `${data.current.condition.text}`;
                    conditionImgElement.src = `${data.current.condition.icon}`;
                    feelslikeElement.textContent = `Feels like: ${data.current.feelslike_c}°C`;
                    humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
    
                    //Save the weather data to localStorage
                    localStorage.setItem('weatherData', JSON.stringify(data));
                    valueCity = '';
                })
                .catch((error) => {
                    //Handle errors
                    console.error('Error: ', error);
                    alert('Unknown location, try to enter another');
                });
            }
        }});
    
        //Check if weather data is stored in localStorage on page load
        const storedWeatherData = localStorage.getItem('weatherData');
    
        if (storedWeatherData) {
            //Parse stored weather data from localStorage
            const data = JSON.parse(storedWeatherData);
            console.log(data);
            // Update HTML elements with stored weather information
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const conditionTextElement = document.querySelector('.condition-text');
            const conditionImgElement = document.querySelector('.condition-img');
            const feelslikeElement = document.querySelector('.feelslike-c');
            const humidityElement = document.querySelector('.humidity');
    
            temperatureElement.textContent = `${data.current.temp_c}°C`;
            locationElement.textContent = `${data.location.name}, ${data.location.country}`;
            conditionTextElement.textContent = `${data.current.condition.text}`;
            conditionImgElement.src = `${data.current.condition.icon}`;
            feelslikeElement.textContent = `Feels like: ${data.current.feelslike_c}°C`;
            humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
        }
    });

// Function to fetch data using XMLHttpRequest and return a Promise
function fetchData(url) {
    // Return a Promise that resolves or rejects based on the XMLHttpRequest
    return new Promise((resolve, reject) => {
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        // Configure the request: GET request to the specified URL
        xhr.open('GET', url, true);
        // Set the event handler function for when data is loaded successfully
        xhr.onload = function () {
            // Check if the request was successful (status code 200)
            if (xhr.status === 200) {
                // Parse the JSON response
                const data = JSON.parse(xhr.responseText);
                
                // Resolve the Promise with parsed data
                resolve(data);
            } else {
                // If the request was not successful, reject the Promise with the status text
                reject(xhr.statusText);
            }
        };
        // Set the event handler function for network errors
        xhr.onerror = function () {
            // Reject the Promise with a network error message
            reject('Network error occurred');
        };
        // Send the request
        xhr.send();
    });
};


function clearPage() {
    body.innerHTML = '';
};

//Select the button element
const themeButton = document.querySelector('.theme');

//Add a click event listener to the theme button
themeButton.addEventListener('click', () => {
    toggleTheme();
});

//Function to toggle between light and dark themes
function toggleTheme() {
    // Get the link element for the stylesheet
    const stylesheet = document.getElementById('stylesheet');

    // Check the current theme and switch to the opposite
    if (stylesheet.getAttribute('href') === 'styles/light.css') {
        // Set the stylesheet to dark mode
        stylesheet.setAttribute('href', 'styles/dark.css');
        //Save theme preferences
        localStorage.setItem('theme', 'dark');
        themeButton.textContent = 'Light Theme';
    } else {
        // Set the stylesheet to light mode
        stylesheet.setAttribute('href', 'styles/light.css');
        //Save theme preferences
        localStorage.setItem('theme', 'light')
        themeButton.textContent = 'Dark Theme';
    }
};

// Check for stored theme preferences on page load
document.addEventListener('DOMContentLoaded', () => {

    // Retrieve stored theme preferences from localStorage
    const storedTheme = localStorage.getItem('theme');

    // If there are stored preferences, apply the corresponding theme
    if (storedTheme) {
        const stylesheet = document.getElementById('stylesheet');
        stylesheet.setAttribute('href', `styles/${storedTheme}.css`);
    }
});