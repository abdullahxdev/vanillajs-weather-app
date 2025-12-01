const API_KEY = 'Replace_with_your_API_Key';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const toggleUnitBtn = document.getElementById('toggleUnit');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const messageContainer = document.getElementById('messageContainer');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const forecastContainer = document.getElementById('forecastContainer');
const historyList = document.getElementById('historyList');

let currentUnit = 'metric'; 
let currentCity = '';
let currentWeatherData = null;


function init() {
    loadSearchHistory();
    createParticles();
    
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    toggleUnitBtn.addEventListener('click', toggleTemperatureUnit);
    clearHistoryBtn.addEventListener('click', clearSearchHistory);
}

function createParticles() {
    const particlesDiv = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesDiv.appendChild(particle);
    }
}

async function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showMessage('Please enter a city name', 'error');
        return;
    }

    currentCity = city;
    showMessage('Loading weather data...', 'loading');

    try {
        await Promise.all([
            fetchCurrentWeather(city),
            fetchForecast(city)
        ]);

        saveToHistory(city);
        
        cityInput.value = '';
        
        clearMessage();
    } catch (error) {
        showMessage('City not found. Please try again.', 'error');
        console.error('Error fetching weather data:', error);
        
        currentWeatherDiv.classList.add('hidden');
        forecastSection.classList.add('hidden');
    }
}

async function fetchCurrentWeather(city) {
    const url = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${currentUnit}&appid=${API_KEY}`;
    
    console.log('Fetching current weather from:', url); 
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('City not found');
    }

    const data = await response.json();
    console.log('Current weather data:', data); 
    
    currentWeatherData = data;
    displayCurrentWeather(data);
    updateBackgroundTheme(data.weather[0].main.toLowerCase());
}

/**
 * @param {string} city 
 */
async function fetchForecast(city) {
    const url = `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${currentUnit}&appid=${API_KEY}`;
    
    console.log('Fetching forecast from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Forecast not found');
    }

    const data = await response.json();
    console.log('Forecast data:', data); // Debug log
    
    displayForecast(data);
}

/**
 * @param {Object} data - Weather data from API
 */
function displayCurrentWeather(data) {
    const tempUnit = currentUnit === 'metric' ? '°C' : '°F';
    const windUnit = currentUnit === 'metric' ? 'm/s' : 'mph';
    
    const html = `
        <div class="weather-header">
            <h2 class="city-name">${data.name}, ${data.sys.country}</h2>
        </div>
        <div class="weather-main">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" 
                 alt="${data.weather[0].description}" 
                 class="weather-icon-large">
            <div class="temperature-display">
                <div class="temperature">${Math.round(data.main.temp)}${tempUnit}</div>
                <div class="weather-description">${data.weather[0].description}</div>
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <div class="detail-label">Feels Like</div>
                <div class="detail-value">${Math.round(data.main.feels_like)}${tempUnit}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Humidity</div>
                <div class="detail-value">${data.main.humidity}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Wind Speed</div>
                <div class="detail-value">${data.wind.speed} ${windUnit}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Pressure</div>
                <div class="detail-value">${data.main.pressure} hPa</div>
            </div>
        </div>
    `;

    currentWeatherDiv.innerHTML = html;
    currentWeatherDiv.classList.remove('hidden');
}

/**
 * @param {Object} data 
 */
function displayForecast(data) {
    const tempUnit = currentUnit === 'metric' ? '°C' : '°F';
    const dailyForecasts = [];
    const processedDates = new Set();
    
    for (let item of data.list) {
        const date = new Date(item.dt * 1000);
        const dateString = date.toDateString();
        
        if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
            dailyForecasts.push(item);
            processedDates.add(dateString);
        }
    }

    const forecastHTML = dailyForecasts.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        return `
            <div class="forecast-card">
                <div class="forecast-date">${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
                     alt="${day.weather[0].description}" 
                     class="forecast-icon">
                <div class="forecast-temp">${Math.round(day.main.temp)}${tempUnit}</div>
                <div class="forecast-details">
                    <div>${day.weather[0].description}</div>
                    <div>Humidity: ${day.main.humidity}%</div>
                </div>
            </div>
        `;
    }).join('');

    forecastContainer.innerHTML = forecastHTML;
    forecastSection.classList.remove('hidden');
}

/**
 * @param {string} weatherType 
 */
function updateBackgroundTheme(weatherType) {
    const body = document.body;
    body.className = '';
    
    if (weatherType.includes('clear')) {
        body.classList.add('clear');
    } else if (weatherType.includes('cloud')) {
        body.classList.add('clouds');
    } else if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
        body.classList.add('rain');
    } else if (weatherType.includes('snow')) {
        body.classList.add('snow');
    } else if (weatherType.includes('thunderstorm')) {
        body.classList.add('thunderstorm');
    } else {
        body.classList.add('default');
    }
}

function toggleTemperatureUnit() {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    
    const unitText = currentUnit === 'metric' ? '°C / °F' : '°F / °C';
    toggleUnitBtn.textContent = unitText;
    
    if (currentCity) {
        cityInput.value = currentCity;
        handleSearch();
    }
}

/**
 * @param {string} city 
 */
function saveToHistory(city) {
    let history = getSearchHistory();
    
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    history.unshift(formattedCity);
    
    history = history.slice(0, 10);
    
    localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
    
    displaySearchHistory();
}

/**
 * @returns {Array} 
 */
function getSearchHistory() {
    const history = localStorage.getItem('weatherSearchHistory');
    return history ? JSON.parse(history) : [];
}

function displaySearchHistory() {
    const history = getSearchHistory();
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center; width: 100%;">No search history yet</p>';
        return;
    }

    const historyHTML = history.map(city => 
        `<div class="history-item" onclick="searchFromHistory('${city}')">${city}</div>`
    ).join('');

    historyList.innerHTML = historyHTML;
}


function loadSearchHistory() {
    displaySearchHistory();
}

/**
 * @param {string} city 
 */
function searchFromHistory(city) {
    cityInput.value = city;
    handleSearch();
}

function clearSearchHistory() {
    localStorage.removeItem('weatherSearchHistory');
    
    displaySearchHistory();
    
    showMessage('Search history cleared', 'loading');
    setTimeout(clearMessage, 2000);
}

/**
 * @param {string} text 
 * @param {string} type 
 */
function showMessage(text, type) {
    const className = type === 'error' ? 'error-message' : 'loading-message';
    
    if (type === 'loading') {
        messageContainer.innerHTML = `
            <div class="message ${className}">
                <div class="spinner"></div>
                <div>${text}</div>
            </div>
        `;
    } else {
        messageContainer.innerHTML = `<div class="message ${className}">${text}</div>`;
    }
}


function clearMessage() {
    messageContainer.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', init);