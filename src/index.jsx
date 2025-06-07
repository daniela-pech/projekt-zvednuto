import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './global.css';
import { StickmanPage } from './components/StickmanPage/StickmanPage';

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
      path: 'stickman',
      element: <StickmanPage />
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />
);