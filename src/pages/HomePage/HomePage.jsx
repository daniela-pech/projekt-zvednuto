import { MotivationalQuote } from "../../components/MotivationQuote/MotivationQuote";
import logo from "./img/logo.svg";
import { Button } from "../../components/Button/Button";
import "./style.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="container">
      <img src={logo} alt="Zvednuto logo" className="logo-homepage" />
      <MotivationalQuote />
      <Link to="/stickman">
        <Button text="Začít trénink" color="#D30F0F" />
      </Link>
      <Button text="Statistiky" color="#236E4C" />
    </div>
  );
};
