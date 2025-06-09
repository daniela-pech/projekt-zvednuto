import { useState } from "react";
import { StickmanBack } from "../StickmanBack/StickmanBack";
import { StickmanFront } from "../StickmanFront/StickmanFront";
import { Header } from "../Header/Header";
import "./StickmanPage.css";

export const StickmanPage = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [isBackView, setIsBackView] = useState(false);

  const handleClick = (part) => setSelectedPart(part);
  const toggleView = () => {
    setIsBackView(!isBackView);
    setSelectedPart(null);
  };

  return (
    <div className="main-panel">
    <div className="container">
      <Header />
      <div className="stickman-page">
        <h1 className="zvednuto-title">Kategorie</h1>
        <p>Klikni na oblast, kterou chceš dnes cvičit.</p>
        <div className="stickman-wrapper">
          <StickmanFront
            selectedPart={selectedPart}
            handleClick={handleClick}
            isVisible={!isBackView}
          />
          <StickmanBack
            selectedPart={selectedPart}
            handleClick={handleClick}
            isVisible={isBackView}
          />
          <button className="button button-red" onClick={toggleView}>
            {isBackView ? "ZEPŘEDU" : "ZEZADU"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
