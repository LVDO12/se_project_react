import {useContext} from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Switch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <input
        onChange={handleToggleSwitchChange}
        className="switch__checkbox"
        id={`switch-new`}
        type="checkbox"
      />
      <label className="switch__label" htmlFor={`switch-new`}>
        <span className={`switch__button`}></span>
        <span className={`switch__text switch__text_F`}>F</span>
        <span className={`switch__text switch__text_C`}>C</span>
      </label>
    </>
  );
}

export default Switch;
