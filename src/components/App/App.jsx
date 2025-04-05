import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../Modal/AddItemModal/AddItemModal";
import LoginModal from "../Modal/LoginModal/LoginModal";
import SignupModal from "../Modal/SignupModal/SignupModal";
import ItemModal from "../Modal/ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../Modal/EditProfileModal/EditProfileModal";
import { getUserInfo, editUserInfo } from "../../utils/api/userApi";
import { getToken, setToken, removeToken } from "../../utils/token";
import { signin, signup } from "../../utils/api/authApi";
import { getItems, postItems, deleteItems } from "../../utils/api/clothesApi";
import { getWeather } from "../../utils/api/weatherApi";
import { likeCard, unLikeCard } from "../../utils/api/cardLikeApi";
import { location, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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
  const [clothingItems, setClothingItems] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

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
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    deleteItems(selectedItem._id, jwt)
      .then(() => {
        const updatedItem = clothingItems.filter(
          (item) => item._id !== selectedItem._id
        );
        setClothingItems(updatedItem);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleAddItemSubmit = (item) => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    postItems(item, jwt)
      .then((res) => {
        console.log(res);
        setClothingItems([res.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then((userData) => {
        console.log(userData);
        if (userData.data) {
          handleSignin({ email, password });
          handleCloseModal();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSignin = ({ email, password }) => {
    signin({ email, password })
      .then((data) => {
        console.log(data);
        if (data && data.token) {
          setToken(data.token);
          getUserInfo(data.token)
            .then((userData) => {
              setIsLoggedIn(true);
              setUserData(userData.data);
              handleCloseModal();
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEditProfile = ({ name, avatar }) => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    editUserInfo(jwt, { name, avatar })
      .then((userData) => {
        setUserData(userData.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const jwt = getToken();

    !isLiked
      ? likeCard(jwt, id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : unLikeCard(jwt, id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeToken();
    return <Navigate to="/" replace />;
  };

  useEffect(() => {
    removeToken();
    setIsLoggedIn(false);
    setUserData(null);
  }, []);

  useEffect(() => {
    const jwt = getToken();
    const itemsPromise = getItems();
    const weatherPromise = getWeather(location, APIkey);
    const userPromise = jwt ? getUserInfo(jwt) : Promise.resolve(null);

    Promise.all([itemsPromise, weatherPromise, userPromise])
      .then(([itemsRes, weatherRes, userRes]) => {
        if (itemsRes && itemsRes.data) {
          setClothingItems(itemsRes.data);
        }
        if (weatherRes) {
          const tempF = weatherRes.main.temp;
          const tempC = Math.round(((weatherRes.main.temp - 32) * 5) / 9);
          setWeatherData({
            tempF,
            tempC,
            data: weatherRes,
          });
        }
        if (userRes && userRes.data) {
          setUserData(userRes.data);
        }
      })
      .catch((err) => {
        console.log(err);
        // removeToken();
        // setIsLoggedIn(false);
        // setUserData(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading) {
    return (
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={userData}>
          <div className="app">
            <Header
              openAddItemModal={() => handleOpenModal("garment")}
              openLoginModal={() => {
                handleOpenModal("login");
              }}
              openSignupModal={() => {
                handleOpenModal("signup");
              }}
              user={userData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleOpenModal={(item) => handleOpenModal("item", item)}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleOpenImage={(item) => handleOpenModal("item", item)}
                      handleOpenAddModal={() => handleOpenModal("garment")}
                      clothingItems={clothingItems}
                      openEditProfileModal={() => handleOpenModal("edit")}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <LoginModal
              isOpen={isModalOpen.type === "login"}
              openSignupModal={() => {
                handleCloseModal();
                handleOpenModal("signup");
              }}
              onSubmit={handleSignin}
              onClose={handleCloseModal}
            />
            <SignupModal
              isOpen={isModalOpen.type === "signup"}
              openLoginModal={() => {
                handleCloseModal();
                handleOpenModal("login");
              }}
              onSubmit={handleRegister}
              onClose={handleCloseModal}
            />
            <AddItemModal
              isOpen={isModalOpen.type === "garment"}
              onAddItem={handleAddItemSubmit}
              onClose={handleCloseModal}
            />
            <ItemModal
              isOpen={isModalOpen.type === "item"}
              formName="item"
              item={selectedItem}
              handleDeleteImage={handleDeleteImage}
              onCardLike={handleCardLike}
              onClose={handleCloseModal}
            />
            <EditProfileModal
              onClose={handleCloseModal}
              isOpen={isModalOpen.type === "edit"}
              onSubmit={handleEditProfile}
            />
            <Footer />
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    );
  }
}

export default App;
