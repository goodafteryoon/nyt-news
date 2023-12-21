import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Scrap from './pages/scrap';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/scrap',
    element: <Scrap />,
  },
]);

export default router;
