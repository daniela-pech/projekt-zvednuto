import { Header } from '../Header/Header';
import { ExcerciseSelect } from '../ExcerciseSelect/ExcerciseSelect';
import './UpperBody.css';

export const UpperBody = () => {
  return (
    <>
      <Header />
      <ExcerciseSelect kategorie="Horní část těla" />
    </>
  );
};
