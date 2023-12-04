import { fetchData, displayWeather, loadWeatherData } from "./api.js";

const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
    // Отображение приветственного окна
    const welcomeButton = document.createElement('button');
    welcomeButton.classList.add('welcome-nextbutton');

    const welcomeModal = document.createElement('div');
    welcomeModal.classList.add('welcome-modal');

    const headingBox = document.createElement('div');
    headingBox.classList.add('heading-box');

    const welcomeHeading = document.createElement('h1');
    welcomeHeading.textContent = 'Weathyy';
    welcomeHeading.classList.add('welcomeModal-heading');

    const welcomeUnderHeading = document.createElement('p');
    welcomeUnderHeading.textContent = 'Weather App';
    welcomeUnderHeading.classList.add('welcome-underHeading');

    const welcomeImg = document.createElement('img');
    welcomeImg.src = 'img/umbrella_start.png';
    welcomeImg.classList.add('welcome-img');

    //Append two elements into main div with class "headingBox";
    headingBox.appendChild(welcomeHeading);
    headingBox.appendChild(welcomeUnderHeading);

    welcomeModal.appendChild(welcomeImg);
    welcomeModal.appendChild(headingBox);
    welcomeModal.appendChild(welcomeButton);

    body.appendChild(welcomeModal);

    function clearWelcomePage() {
        welcomeModal.style.display = 'none';
    }

    welcomeButton.addEventListener('click', () => {
        // Скрытие приветственного окна и загрузка данных о погоде
        clearWelcomePage();
        loadWeatherData();
    })
});

const submitButton = document.getElementById('btnSubmit');
    submitButton.addEventListener('click', () => {
        const apiKey = '6a1dd8448eaa46809c8184729232311';
        const baseUrl = 'https://api.weatherapi.com/v1';
        const valueCityInput = document.getElementById('valueCity');

        if (valueCityInput) {
            let valueCity = valueCityInput.value;

            if (valueCity === '' || !isNaN(valueCity)) {
                alert('Insert a city!');
                valueCity = '';
            } else {
                const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${valueCity}`;

                fetchData(apiUrl)
                    .then((data) => {
                        displayWeather(data);
                        valueCity = '';
                    })
                    .catch((error) => {
                        console.error('Error: ', error);
                        alert('Unknown location, try to enter another');
                    });
            }
        }
    });

const themeButton = document.querySelector('.theme');
themeButton.addEventListener('click', () => {
    toggleTheme();
});

function toggleTheme() {
    const stylesheet = document.getElementById('stylesheet');

    if (stylesheet.getAttribute('href') === 'styles/light.css') {
        stylesheet.setAttribute('href', 'styles/dark.css');
        localStorage.setItem('theme', 'dark');
        themeButton.textContent = 'Light Theme';
    } else {
        stylesheet.setAttribute('href', 'styles/light.css');
        localStorage.setItem('theme', 'light')
        themeButton.textContent = 'Dark Theme';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        const stylesheet = document.getElementById('stylesheet');
        stylesheet.setAttribute('href', `styles/${storedTheme}.css`);
    }
});


