import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/home/HomePage';
import NotFoundPage from '../pages/404/NotFoundPage';


export default createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
]);
