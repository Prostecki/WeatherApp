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
    } else {
        // Set the stylesheet to light mode
        stylesheet.setAttribute('href', 'styles/light.css');
        //Save theme preferences
        localStorage.setItem('theme', 'light')
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