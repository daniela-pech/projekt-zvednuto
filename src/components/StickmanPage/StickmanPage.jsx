import { useState } from 'react';
import { StickmanBack } from '../StickmanBack/StickmanBack';
import { StickmanFront } from '../StickmanFront/StickmanFront';
import './StickmanPage.css';
import { Header } from '../Header/Header';

export const StickmanPage = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [isBackView, setIsBackView] = useState(false);

  const handleClick = (part) => setSelectedPart(part);
  const toggleView = () => {
    setIsBackView(!isBackView);
    setSelectedPart(null);
  };

  return (
    <div className="container">
      <Header />
      <div className="stickman-page">
        <h2 className="zvednuto-title">Kategorie</h2>
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
          <button className="button" onClick={toggleView}>
            {isBackView ? 'Zobrazit přední stranu' : 'Zobrazit zadní stranu'}
          </button>
        </div>
      </div>
    </div>
  );
};
