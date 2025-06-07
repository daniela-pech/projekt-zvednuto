import { Header } from '../Header/Header';
import { ExerciseSelect } from '../ExerciseSelect/ExerciseSelect';
import './UpperBody.css';

export const UpperBody = () => {
  return (
    <div className="container">
      <Header />
      <ExerciseSelect category="Horní část těla" />
    </div>
  );
};
