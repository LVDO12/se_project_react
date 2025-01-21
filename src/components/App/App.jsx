import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getItems, postItems, deleteItems } from "../../utils/clothesApi";
import { getWeather } from "../../utils/weatherApi";
import { location, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    tempC: 999,
    tempF: 999,
    data: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    type: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItem] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleOpenModal = (modalType, item) => {
    setIsModalOpen({ type: modalType, isOpen: true });
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen({ type: null, isOpen: false });
  };

  const handleDeleteImage = () => {
    deleteItems(selectedItem._id)
      .then(() => {
        const updatedItem = clothingItems.filter(
          (item) => item._id !== selectedItem._id
        );
        setClothingItem(updatedItem);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleAddItemSubmit = ({ name, link, weatherType }) => {
    postItems({ name, imageUrl: link, weather: weatherType })
      .then((data) => {
        setClothingItem([data, ...clothingItems]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getItems()
      .then((data) => setClothingItem(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getWeather(location, APIkey)
      .then((data) => {
        const tempF = data.main.temp;
        const tempC = Math.round(((data.main.temp - 32) * 5) / 9);
        setWeatherData({
          tempF: tempF,
          tempC: tempC,
          data: data,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading) {
    return (
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <Header
            openModal={() => handleOpenModal("garment")}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleOpenModal={(item) => handleOpenModal("item", item)}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleOpenImage={(item) => handleOpenModal("item", item)}
                  handleOpenModal={() => handleOpenModal("garment")}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <AddItemModal
            onClose={handleCloseModal}
            isOpen={isModalOpen.type === "garment"}
            onAddItem={({ name, link, weatherType }) =>
              handleAddItemSubmit({ name, link, weatherType })
            }
          ></AddItemModal>
          <ItemModal
            isOpen={isModalOpen.type === "item"}
            onClose={handleCloseModal}
            formName="item"
            item={selectedItem}
            handleDeleteImage={handleDeleteImage}
          />

          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    );
  }
}

export default App;
