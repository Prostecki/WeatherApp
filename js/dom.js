const body = document.querySelector('body');

// nextButton.addEventListener('click', )
export function welcomeWindow() {
    
    clearPage();

    const nextButton = document.createElement('button');
    nextButton.classList.add('welcome-nextbutton');

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
    welcomeModal.appendChild(nextButton);

    body.appendChild(welcomeModal);
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