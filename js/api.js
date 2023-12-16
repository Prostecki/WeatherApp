// Function to fetch data using XMLHttpRequest and return a Promise
export function fetchData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => (xhr.status === 200) ? resolve(JSON.parse(xhr.responseText)) : reject(xhr.statusText);
        xhr.onerror = () => reject('Network error occurred');
        xhr.send();
    });
}

// Function to display weather data
export function displayWeather(data) {
    const { current, location } = data;
    const elements = {
        location: document.getElementById('location'),
        localTime: document.getElementById('localTime'),
        temperature: document.getElementById('temperature'),
        conditionText: document.querySelector('.condition-text'),
        conditionImg: document.querySelector('.condition-img'),
        feelslike: document.querySelector('.feelslike-c'),
        feelslikeF: document.querySelector('.feelslike-f'),
        humidity: document.querySelector('.humidity')
    };

    elements.temperature.textContent = `${current.temp_c}°C`;
    elements.location.textContent = `${location.name}, ${location.country}`;
    elements.localTime.textContent = `${location.localtime}`;
    elements.conditionText.textContent = `${current.condition.text}`;
    elements.conditionImg.src = `${current.condition.icon}`;
    elements.feelslike.textContent = `Feels like: ${current.feelslike_c}°C`;
    elements.feelslikeF.textContent = `Feels like: ${current.feelslike_f}F`;
    elements.humidity.textContent = `Humidity: ${current.humidity}%`;

    localStorage.setItem('weatherData', JSON.stringify(data));
}

// Function to load weather data
export function loadWeatherData() {
    const storedWeatherData = localStorage.getItem('weatherData');
    if (storedWeatherData) {
        displayWeather(JSON.parse(storedWeatherData));
    } else {
        console.log('No weather data found. Please perform a search.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('btnSubmit');
    const valueCityInput = document.getElementById('valueCity');

    // Function to handle weather data fetching
    const fetchDataAndDisplayWeather = async () => {
        const apiKey = '6a1dd8448eaa46809c8184729232311'; // Replace with your actual API key
        const baseUrl = 'https://api.weatherapi.com/v1';

        if (valueCityInput) {
            let valueCity = valueCityInput.value;

            if (valueCity === '' || !isNaN(valueCity)) {
                alert('Insert a city!');
            } else {
                const currentApiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${valueCity}`;
                const astronomyApiUrl = `${baseUrl}/astronomy.json?key=${apiKey}&q=${valueCity}`;

                try {
                    const [currentData, astronomyData] = await Promise.all([
                        fetchData(currentApiUrl),
                        fetchData(astronomyApiUrl)
                    ]);
                    displayWeather(currentData);
                    console.log('Current Data:', currentData);
                    console.log('Astronomy Data:', astronomyData);
                } catch (error) {
                    console.error('Error:', error);
                    alert('Unknown location, try to enter another');
                }
            }
        }
    };

    // Event listener for the button click
    submitButton.addEventListener('click', fetchDataAndDisplayWeather);

    // Event listener for 'Enter' key press in the input field
    valueCityInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            await fetchDataAndDisplayWeather();
        }
    });
    loadWeatherData();
});
