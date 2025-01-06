import React from 'react';
import './Main.css';
import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from './ItemCard/ItemCard';
import {defaultClothingItems } from '../../utils/constants';


function Main ({weatherData, handleOpenModal}){
    const filteredItems = defaultClothingItems.filter((item)=>{
        if (weatherData && weatherData.main.temp >= 86){
            return item.weather === 'hot';
        } else if (weatherData && weatherData.main.temp >= 66){
            return item.weather === 'warm';
        } else {
            return item.weather === 'cold';
        }
    })

    return (
        <main className="main">
            {weatherData && <WeatherCard temperature={weatherData.main.temp} />}
            <p className="main__title__text">Today is {weatherData.main.temp}° F / You may want to wear:</p>
            <ul className="main__gallery">
                {filteredItems.map((item)=>{
                return (
                    <ItemCard key={item._id} item={item} handleOpenModal={handleOpenModal}/>
                );})
                }
            </ul>
        </main>
        
    );
}

export default Main;