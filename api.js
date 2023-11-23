// Weather API key for authentication
const apiKey = '7745ad0a99b44eb8a1b165946232111';

// Base URL for the Weather API
const baseUrl = 'http://api.weatherapi.com/v1';

// City for which weather information is requested
const valueCity = document.getElementById('valueCity');

console.log(valueCity);

// Construct the full API URL with parameters
const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;

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

// Use the fetchData function to get weather data
fetchData(apiUrl)
    .then((data) => {
        // Extract location and temperature from the data
        const location = data.location.name;
        const temperature = data.current.temp_c;

        // Update HTML elements with weather information
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        temperatureElement.textContent = `Current Temperature: ${temperature}°C`;
        locationElement.textContent = `Location: ${location}`;
    })
    .catch((error) => {
        // Handle errors
        console.error('Error: ', error);
    });