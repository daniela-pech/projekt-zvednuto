import { Header } from '../Header/Header';
import { ExerciseSelect } from '../ExerciseSelect/ExerciseSelect';
import './LowerBody.css';

export const LowerBody = () => {
  return (
    <>
      <Header />
      <ExerciseSelect category={'Spodní část těla'} />
    </>
  );
};
