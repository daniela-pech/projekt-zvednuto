import { Header } from "../Header/Header";
import { ExerciseSelect } from "../ExerciseSelect/ExerciseSelect";

export const UpperBody = () => {
  return (
    <div className="main-panel">
      <div className="container">
        <Header />
        <ExerciseSelect category="Horní část těla" />
      </div>
    </div>
  );
};
