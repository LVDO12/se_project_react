import React from "react";
import "./WeatherCard.css";


function WeatherCard({ temperature ,currentTemperatureUnit}) {
  return (
    <div className="weather-card">
      <p className="weather-card__temperature">{temperature}°{currentTemperatureUnit}</p>
    </div>
  );
}

export default WeatherCard;
