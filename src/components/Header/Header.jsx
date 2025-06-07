import home from './home.png';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={home} alt="Domů" className="header-home" />
      </Link>
      <img src={logo} alt="Zvednuto logo" className="header-logo" />
    </header>
  );
};
