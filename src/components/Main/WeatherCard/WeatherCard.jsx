import React from 'react';
import './WeatherCard.css';

function WeatherCard({ temperature }) {
  return (
    <div className="weather-card">
        <p className='weather-card__temperature'>{temperature}°F</p>
    </div>
  );
}

export default WeatherCard;