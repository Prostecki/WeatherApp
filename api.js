// Weather API key for authentication
const apiKey = '7745ad0a99b44eb8a1b165946232111';

// Base URL for the Weather API
const baseUrl = 'http://api.weatherapi.com/v1';

// City for which weather information is requested
const city = 'Stockholm';

// Construct the full API URL with parameters
const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;

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

// Use the fetchData function
fetchData(apiUrl)
    .then((data) => {
        const location = data.location.name;
        const temperature = data.current.temp_c;
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        temperatureElement.textContent = `Current Temperature: ${temperature}°C`;
        locationElement.textContent = `Location: ${location}`;
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
