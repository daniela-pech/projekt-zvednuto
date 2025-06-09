import { Header } from '../Header/Header';
import { ExerciseSelect } from '../ExerciseSelect/ExerciseSelect';
import './Core.css';

export const Core = () => {
  return (
    <div className="main-panel">
    <div className="container">
      <Header />
      <ExerciseSelect category={'Střed těla'} />
    </div>
    </div>
  );
};
