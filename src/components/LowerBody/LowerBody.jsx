import { Header } from '../Header/Header';
import { ExcerciseSelect } from '../ExcerciseSelect/ExcerciseSelect';
import './LowerBody.css';

export const LowerBody = () => {
  return (
    <>
      <Header />
      <ExcerciseSelect kategorie={'Spodní část těla'} />
    </>
  );
};
