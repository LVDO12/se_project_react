import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleOpenModal, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const currentUser = useContext(CurrentUserContext);
  const temperature =
    currentTemperatureUnit === "F" ? weatherData.tempF : weatherData.tempC;
  const filteredItems =
    clothingItems.filter((item) => {
      if (weatherData && weatherData.tempF >= 86) {
        return item.weather === "hot";
      } else if (weatherData && weatherData.tempF >= 66) {
        return item.weather === "warm";
      } else {
        return item.weather === "cold";
      }
    }) || [];

  return (
    <main className="main">
      {weatherData && (
        <WeatherCard
          temperature={temperature}
          currentTemperatureUnit={currentTemperatureUnit}
        />
      )}
      <p className="main__title__text">
        Today is {temperature}°{currentTemperatureUnit} / You may want to wear:
      </p>
      <ul className="main__gallery">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleOpenModal={handleOpenModal}
              onCardLike={onCardLike}
              isLiked={item.likes && item.likes.includes(currentUser?._id)}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
