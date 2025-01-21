import React from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({ handleOpenModal, handleOpenImage, clothingItems }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        handleOpenModal={handleOpenModal}
        handleOpenImage={handleOpenImage}
        clothingItems={clothingItems}
      />
    </div>
  );
}

export default Profile;
