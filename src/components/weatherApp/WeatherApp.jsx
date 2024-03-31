import React, { useState } from 'react';
import './weatherApp.css';
import searchIcon from '../assets/search.png';
import sunIcon from '../assets/sunny.svg';
import moonIcon from '../assets/moony.svg';
import dCloudyIcon from '../assets/d-cloudy.svg';
import nCloudyIcon from '../assets/n-cloudy.svg';
import dScatteredIcon from '../assets/d-scattered.svg';
import nScatteredIcon from '../assets/n-scattered.svg';
import dBrokenIcon from '../assets/d-broken.svg';
import nBrokenIcon from '../assets/n-broken.svg';
import dShowerIcon from '../assets/d-shower.svg';
import nShowerIcon from '../assets/n-shower.svg';
import dRainIcon from '../assets/d-rain.svg';
import nRainIcon from '../assets/n-rain.svg';
import dStormIcon from '../assets/d-storm.svg';
import nStormIcon from '../assets/n-storm.svg';
import dSnowIcon from '../assets/d-snow.svg';
import nSnowIcon from '../assets/n-snow.svg';
import mistIcon from '../assets/misty.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';

const WeatherApp = () => {
  const apiKey = '82125c2110daa99f6fa1f8d58f1d90e9';
  const [weatherIcon, setWeatherIcon] = useState(sunIcon);
  const [weatherData, setWeatherData] = useState({
    humidity: 0,
    windSpeed: 0,
    temperature: 0,
    location: '',
  });

  const handleSearch = async () => {
    const cityInput = document.querySelector('.cityInput');
    if (!cityInput.value) {
      alert('Please enter a city name');
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const { main, wind, name, weather } = data;

    setWeatherData({
      humidity: main.humidity,
      windSpeed: Math.round((wind.speed * 1000) / 3600),
      temperature: Math.round(main.temp),
      location: name,
    });

    const iconMapping = {
      '01d': sunIcon,
      '01n': moonIcon,
      '02d': dCloudyIcon,
      '02n': nCloudyIcon,
      '03d': dScatteredIcon,
      '03n': nScatteredIcon,
      '04d': dBrokenIcon,
      '04n': nBrokenIcon,
      '09d': dShowerIcon,
      '09n': nShowerIcon,
      '10d': dRainIcon,
      '10n': nRainIcon,
      '11d': dStormIcon,
      '11n': nStormIcon,
      '13d': dSnowIcon,
      '13n': nSnowIcon,
      '50d': mistIcon,
      '50n': mistIcon,
    };

    setWeatherIcon(iconMapping[weather[0].icon]);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Поиск" />
        <div className="search-icon" onClick={handleSearch}>
          <img src={searchIcon} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="/" />
      </div>
      <div className="weather-temp">{weatherData.temperature}°C</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}%</div>
            <div className="text">Влажность</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="Wind" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed} м/с</div>
            <div className="text">Ветер</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
