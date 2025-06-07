import { MotivationalQuote } from '../../components/MotivationQuote/MotivationQuote';
import logo from './img/LogoNew.png'
import { Button } from '../../components/Button/Button';
import './style.css';

export const HomePage = () => {
  return (
    <div className="container">
       <img src={logo} alt="Zvednuto logo" className="logo-homepage" />
      <MotivationalQuote />
      <Button text="Začít trénink" />
      <Button text="Statistiky" />
    </div>
  );
};
