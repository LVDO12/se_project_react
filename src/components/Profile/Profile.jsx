import React from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  handleOpenAddModal,
  handleOpenImage,
  clothingItems,
  openEditProfileModal,
  onLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <SideBar
        openEditProfileModal={openEditProfileModal}
        onLogout={onLogout}
      />
      <ClothesSection
        handleOpenModal={handleOpenAddModal}
        handleOpenImage={handleOpenImage}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
