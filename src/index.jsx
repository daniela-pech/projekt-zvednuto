import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './global.css';
import { StickmanPage } from './components/StickmanPage/StickmanPage';
import { UpperBody } from './components/UpperBody/UpperBody';
import { LowerBody } from './components/LowerBody/LowerBody';
import { Core } from './components/Core/Core';
import { ExerciseList } from './components/ExerciseList/ExerciseList';
import { ExerciseSelect } from './components/ExerciseSelect/ExerciseSelect';
import { ExerciseDetail } from './components/ExerciseDetail/ExerciseDetail';
import { WorkoutForm } from './components/WorkoutForm/WorkoutForm';

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'stickman',
    element: <StickmanPage />,
  },
  {
    path: '/stickman/upper',
    element: <UpperBody />,
  },
  {
    path: '/stickman/lower',
    element: <LowerBody />,
  },
  {
    path: '/stickman/core',
    element: <Core />,
  },
  {
    path: '/stickman/exerciselist',
    element: <ExerciseList />,
  },
  {
    path: '/stickman/exerciseselect',
    element: <ExerciseSelect />,
  },
  {
    path: '/stickman/exercisedetail',
    element: <ExerciseDetail />,
  },
  {
    path: 'exercise/:id',
    element: <ExerciseDetail />,
  },
  {
    path: '/workoutform',
    element: <WorkoutForm />,
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />,
);
