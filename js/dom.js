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

// //Function to check if the device is a mobile device
// function isMobileDevice() {
//     return window.innerWidth <= 600; // Adjust the width threshold as needed
// }

// //Function to dynamically load CSS based on device type and theme
// function loadCSS() {
//     const commonLink = document.createElement('link');

//     commonLink.rel = 'stylesheet';

//     //Common styles
//     commonLink.href = 'styles/light.css';

//     const additionalLink = document.createElement('link');
//     additionalLink.rel = 'stylesheet';

//     if (isMobileDevice()) {
//         //Load mobile styles
//         additionalLink.href = 'styles/responsive.css'; 
//     } else {
//         //Switch between light and dark themes based on some criteria
//         //For example, you can use a preference saved in localStorage
//         const isDarkTheme = localStorage.getItem('theme') === 'dark';

//         additionalLink.href = isDarkTheme ? 'styles/dark.css' : 'styles-light.css';
//     }

//     document.head.appendChild(commonLink);
//     document.head.appendChild(additionalLink);
// }

// //Load CSS when the DOM is ready
// document.addEventListener('DOMContentLoaded', loadCSS);
