import React, { useContext } from "react";
import notevalue from "../context/notes/noteContext";

function Alert() {
  const context = useContext(notevalue);
  const { alert } = context;
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div className="alert-container ">
      <div className="realalert-container fixed-top">
        {alert && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {capitalize(alert.type)}:{alert.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Alert;
