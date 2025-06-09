import { MotivationalQuote } from "../../components/MotivationQuote/MotivationQuote";
import logo from "./img/logo.svg";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./style.css";

export const HomePage = () => {
  return (
    <div className="main-panel main-panel_hp">
      <div className="container">
        <img src={logo} alt="Zvednuto logo" className="logo-homepage" />
        <MotivationalQuote />
        <Link to="/stickman">
          <Button text="Začít trénink" color="#D30F0F" />
        </Link>
      </div>
    </div>
  );
};
