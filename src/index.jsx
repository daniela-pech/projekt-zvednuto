import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './global.css';

const App = () => {
  return (
    <div>
      <h1>Zvednuto</h1>
      <nav>
        <Link to="/">Domů</Link>
      </nav>
      <HomePage />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />
);