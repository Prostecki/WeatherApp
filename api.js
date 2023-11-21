// Weather API key and base URL
const apiKey = '7745ad0a99b44eb8a1b165946232111';
const baseUrl = 'http://api.weatherapi.com/v1';

// City for weather information
const city = 'Stockholm';

// Construct the full API URL with parameters
const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;

// Function to fetch data using XMLHttpRequest and return a Promise
function fetchData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
                console.log(data);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = function () {
            reject('Network error occurred');
        };

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
