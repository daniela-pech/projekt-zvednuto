import { Header } from '../Header/Header';
import { ExcerciseSelect } from '../ExcerciseSelect/ExcerciseSelect';
import './Core.css';

export const Core = () => {
  return (
    <>
      <Header />
      <ExcerciseSelect kategorie={'Střed těla'} />
    </>
  );
};
