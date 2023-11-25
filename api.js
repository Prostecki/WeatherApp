// Weather API key for authentication
const apiKey = '6a1dd8448eaa46809c8184729232311';

// Base URL for the Weather API
const baseUrl = 'http://api.weatherapi.com/v1';

// City for which weather information is requested
const valueCity = document.getElementById('valueCity').value;

const valueCityOnce = 'Stockholm'

// Construct the full API URL with parameters
const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${valueCity}`;

// Function to fetch data using XMLHttpRequest and return a Promise
function fetchData(url) {
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
                
                // Resolve the Promise with the parsed data
                resolve(data);

                // Log the data to the console
                console.log(data);
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
}

// Add an event listener to the button for fetching weather data on click
document.getElementById('btnSubmit').addEventListener('click', () => {

    // Get the value of the city from the input field
    const valueCity = document.getElementById('valueCity').value;

    // Construct the full API URL with parameters using the input city
    const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${valueCity}`;

// Use the fetchData function to get weather data
fetchData(apiUrl)
.then((data) => {
    // Extract location and temperature from the data
    const location = data.location.name;
    const temperature = data.current.temp_c;
    const country = data.location.country;
    const condition = data.current.condition.text;
    const conditionImg = data.current.condition.img;

    // Update HTML elements with weather information
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const countryElement = document.getElementById('country');
    const conditionTextElement = document.querySelector('.condition-text');
    const conditionImgElement = document.querySelector('.condition-img');

    temperatureElement.textContent = `Current Temperature: ${temperature}°C`;
    locationElement.textContent = `Location: ${location}`;
    countryElement.textContent = `Country: ${country}`;
    conditionTextElement.textContent = `Condition: ${condition}`;
    conditionImgElement.src = `${conditionImg}`;

    //Save the weather data to localStorage
    localStorage.setItem('weatherData', JSON.stringify(data));
    })
.catch((error) => {
    // Handle errors
    console.error('Error: ', error);
    });
})

// Check if weather data is stored in localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedWeatherData = localStorage.getItem('weatherData');
    if(storedWeatherData) {
        const data = JSON.parse(storedWeatherData);
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        const countryElement = document.getElementById('country');
        temperatureElement.textContent = `Current Temperature: ${data.current.temp_c}°C`;
        locationElement.textContent = `Location: ${data.location.name}`;
        countryElement.textContent = `Country: ${data.location.country}`;
    }
})
