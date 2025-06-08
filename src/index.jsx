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
<<<<<<< HEAD
import { WorkoutForm } from './components/WorkoutForm/WorkoutForm';
=======
import { WorkoutPage } from './components/WorkoutPage/WorkoutPage';
>>>>>>> main

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
    path: '/upper',
    element: <UpperBody />,
  },
  {
    path: '/lower',
    element: <LowerBody />,
  },
  {
    path: '/core',
    element: <Core />,
  },

  {
    path: 'exercise/:id',
    element: <ExerciseDetail />,
  },
  {
    path: '/workoutform',
    element: <WorkoutForm />,
  },
    {
    path: 'workoutpage',
    element: <WorkoutPage />,
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />,
);
