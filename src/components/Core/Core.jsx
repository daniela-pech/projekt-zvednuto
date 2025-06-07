import { Header } from '../Header/Header';
import { ExerciseSelect } from '../ExerciseSelect/ExerciseSelect';
import './Core.css';

export const Core = () => {
  return (
    <>
      <Header />
      <ExerciseSelect category={'Střed těla'} />
    </>
  );
};
