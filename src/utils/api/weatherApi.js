import { checkResponse } from "./apiConfig";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(checkResponse)
    .then((data) => {
      data.main.temp = Math.floor(data.main.temp);
      return data;
    })
};
