import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './global.css';
import { StickmanPage } from './components/StickmanPage/StickmanPage';
import { UpperBody } from './components/UpperBody/UpperBody';
import { LowerBody } from './components/LowerBody/LowerBody';
import { Core } from './components/Core/Core';

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
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />,
);
