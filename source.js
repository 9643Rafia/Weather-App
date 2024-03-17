//getting values by DOM
const apiKey = "45f2404fc1d22938dcce7d37cd22512c";
const form = document.getElementById('weather-form');
const cityData = document.getElementById('city');
const weatherContainer = document.getElementById('weather-container');

//adding event listener for submit button
form.addEventListener('submit', (e) => 
{
    e.preventDefault();
    const cityName = cityData.value.trim();
    if (cityName) {
        getWeatherData(cityName);
    }
});

//method to get weather data using open weather api
function getWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayWeatherData(data);
        } else {
            alert('Weather Data could not be fetched');
        }
    };
    xhr.send();
}

//display weather data using json and dom manipulation
function displayWeatherData(data) 
{
    //create container for name and icon
    const nameIconContainer = document.createElement('div');
    nameIconContainer.classList.add('name-icon-container');

    const name = document.createElement('h1');
    name.textContent = `${data.name}`;

    const icon = document.createElement('img');
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.alt = data.weather[0].description;

    nameIconContainer.appendChild(name);
    nameIconContainer.appendChild(icon);

    const description = document.createElement('h4');
    // description.classList.add('description-container');
    description.textContent = `${data.weather[0].description}`;

    const line = document.createElement('hr');

    //create container for weather data

    const weatherDataContainer=document.createElement('div');
    weatherDataContainer.classList.add('weather-data-container');

    const temp = document.createElement('p');
    temp.textContent = `Temperature: ${data.main.temp}°C`;

    // const description = document.createElement('p');
    // description.textContent = `Description: ${data.weather[0].description}`;

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const pressure=document.createElement('p');
    pressure.textContent=`Pressure: ${data.main.pressure} hPa`;

    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const visibility=document.createElement('p');
    visibility.textContent=`Visibility: ${data.visibility} km`;

    weatherDataContainer.appendChild(temp);
    weatherDataContainer.appendChild(humidity);
    weatherDataContainer.appendChild(pressure);
    weatherDataContainer.appendChild(windSpeed);
    weatherDataContainer.appendChild(visibility);


    weatherContainer.innerHTML = '';
    weatherContainer.appendChild(nameIconContainer);
    weatherContainer.appendChild(description);
    weatherContainer.appendChild(line);
    weatherContainer.appendChild(weatherDataContainer);
}