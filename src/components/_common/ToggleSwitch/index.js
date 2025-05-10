import React from "react";
import "./style.css"

const ToggleSwitch = ({ value, onChange }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
