import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import "./App.css";
import { getWeather } from "../../utils/weatherApi";
import { location, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    type: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (modalType, item) => {
    setIsModalOpen({ type: modalType, isOpen: true});
    if(item){
      setSelectedItem(item);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen({ type: null, isOpen: false });
  };

  useEffect(() => {
    getWeather(location, APIkey)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => console.log(err))
      .finally(()=>setIsLoading(false));
  }, []);

  if (!isLoading) {
    return (
      <div className="app">
        <Header openModal={() => handleOpenModal("garment")} />
        <Main
          weatherData={weatherData}
          handleOpenModal={(item) => handleOpenModal("item", item)}
        />
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          name="garment"
          onClose={handleCloseModal}
          isOpen={isModalOpen.type === "garment"}
        >
          <fieldset className="form__set">
            <label className="form__field">
              Name
              <input
                type="text"
                className="form__input"
                placeholder="Name"
                id="name"
              />
            </label>
            <label className="form__field">
              Image
              <input
                type="url"
                className="form__input"
                placeholder="Image URL"
                id="url"
              />
            </label>
          </fieldset>
          <fieldset className="form__set form__radio-set">
            <legend className="form__title form__legend__title">
              Select the weather type:
              <label className="form__radio-field ">
                Hot
                <input
                  type="radio"
                  id="hot"
                  name="weather"
                  className="form__radio-input form__input"
                />
              </label>
              <label className="form__radio-field">
                Warm
                <input
                  type="radio"
                  id="warm"
                  name="weather"
                  className="form__radio-input form__input"
                />
              </label>
              <label className="form__radio-field">
                Cold
                <input
                  type="radio"
                  id="cold"
                  name="weather"
                  className="form__radio-input form__input"
                />
              </label>
            </legend>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          isOpen={isModalOpen.type === "item"}
          onClose={handleCloseModal}
          name="item"
          item={selectedItem}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
