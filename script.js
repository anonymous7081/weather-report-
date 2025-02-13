const container = document.querySelector('.container');
const search = document.querySelector('#searchButton');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const inputField = document.querySelector('.search-box input'); // Reference to the input field

// Function to fetch weather data
const fetchWeatherData = (city) => {
    const APIKey = 'be7dce788466027c5991d1c57d2c3b6c';

    // Clear previous weather data
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .desciption');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    
    // Reset elements before fetching new data
    temperature.innerHTML = '';
    description.innerHTML = '';
    humidity.innerHTML = '';
    wind.innerHTML = '';
    
    // Hide elements to avoid showing old data
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.remove('active');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            // Set city name for display
            if (cityHide.textContent !== city) {
                cityHide.textContent = city;
                error404.classList.remove('active');
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');

                // Display weather data
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.png';
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }

                // Update temperature, description, humidity, and wind
                temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

                // Manage clones and animations (if necessary)
                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                // Additional animation logic, if required, remains the same.
            }
        });
};


// Event listener for the search button
search.addEventListener('click', () => {
    const city = inputField.value;
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    fetchWeatherData(city);
});

// Event listener for pressing the Enter key
inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = inputField.value;
        if (city === '') {
            alert('Please enter a city name.');
            return;
        }
        fetchWeatherData(city);
    }
});
