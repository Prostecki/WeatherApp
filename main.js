// Weather API key for authentication
const apiKey = '7745ad0a99b44eb8a1b165946232111';

// Base URL for the Weather API
const baseUrl = 'http://api.weatherapi.com/v1';

// City for which weather information is requested
const city = 'Stockholm';

// Construct the full API URL with parameters
const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;

// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Configure the request: GET request to the specified URL
xhr.open('GET', apiUrl, true);

// Set the event handler function for when data is loaded successfully
xhr.onload = function () {
  // Check if the request was successful (status code 200)
  if (xhr.status === 200) {
    // Parse the JSON response
    const data = JSON.parse(xhr.responseText);

    // Process weather data
    console.log(data);
  } else {
    // If the request was not successful, handle the error
    console.error('Error:', xhr.statusText);
  }
};

// Set the event handler function for network errors
xhr.onerror = function () {
  console.error('Network error occurred');
};

// Send the request
xhr.send();
