import React, { useState } from "react";

import RulesImage from "../../assets/image-rules.svg";
import CloseIcon from "../../assets/icon-close.svg";

export default function Rules() {
  const [isActive, setIsActive] = useState(false);

  const handleChangeMode = () => {
    console.log("test")
  }

  return (
    <div className="buttons">
      <div className="mode-button" onClick={handleChangeMode}>Mode</div>
      <div className="rules-button" onClick={() => setIsActive(!isActive)}>Rules</div>

      {
        isActive ? (
          <>
            <div className="rules-content">
              <div className="rules-content__top-section">
                <h2 className="rules-content__top-section-title">Rules</h2>

                <div className="rules-content__top-section-close" onClick={() => setIsActive(false)}>
                  <img src={CloseIcon} alt="Close Icon" />
                </div>
              </div>

              <img src={RulesImage} alt="Rules" />
            </div>

            <div className="rules-overlay" onClick={() => setIsActive(false)}></div>
          </>
        ) : null
      }
    </div>
  );
}