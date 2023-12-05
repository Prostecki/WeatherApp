// Function to fetch data using XMLHttpRequest and return a Promise
export function fetchData(url) {
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

export function displayWeather(data) {
    //Display a data on the page
    const locationElement = document.getElementById('location');
    const localTime = document.getElementById('localTime');
    const temperatureElement = document.getElementById('temperature');
    const conditionTextElement = document.querySelector('.condition-text');
    const conditionImgElement = document.querySelector('.condition-img');
    const feelslikeElement = document.querySelector('.feelslike-c');
    const humidityElement = document.querySelector('.humidity');

    temperatureElement.textContent = `${data.current.temp_c}°C`;
    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    localTime.textContent = `${data.location.localtime}`;
    conditionTextElement.textContent = `${data.current.condition.text}`;
    conditionImgElement.src = `${data.current.condition.icon}`;
    feelslikeElement.textContent = `Feels like: ${data.current.feelslike_c}°C`;
    humidityElement.textContent = `Humidity: ${data.current.humidity}%`;

    //Save a data about weather in localStorage
    localStorage.setItem('weatherData', JSON.stringify(data));
}

export function loadWeatherData() {
    //Check if it's possible to display a data in localStorage
    const storedWeatherData = localStorage.getItem('weatherData');

    if (storedWeatherData) {
        //If it is, load and display
        const data = JSON.parse(storedWeatherData);
        displayWeather(data);
    } else {
        //If it isn't, run console log message
        console.log('No weather data found. Please perform a search.');
    }
}

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
                    const localTime = document.getElementById('localTime');
                    const temperatureElement = document.getElementById('temperature');
                    const conditionTextElement = document.querySelector('.condition-text');
                    const conditionImgElement = document.querySelector('.condition-img');
                    const feelslikeElement = document.querySelector('.feelslike-c');
                    const humidityElement = document.querySelector('.humidity');
    
                    //Update HTML elements with weather information
                    temperatureElement.textContent = `${data.current.temp_c}°C`;
                    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
                    localTime.textContent = `${data.location.localtime}`;
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
            const localTime = document.getElementById('localTime');
            const temperatureElement = document.getElementById('temperature');
            const conditionTextElement = document.querySelector('.condition-text');
            const conditionImgElement = document.querySelector('.condition-img');
            const feelslikeElement = document.querySelector('.feelslike-c');
            const humidityElement = document.querySelector('.humidity');
    
            temperatureElement.textContent = `${data.current.temp_c}°C`;
            locationElement.textContent = `${data.location.name}, ${data.location.country}`;
            localTime.textContent = `${data.location.localtime}`;
            conditionTextElement.textContent = `${data.current.condition.text}`;
            conditionImgElement.src = `${data.current.condition.icon}`;
            feelslikeElement.textContent = `Feels like: ${data.current.feelslike_c}°C`;
            humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
        }
    });