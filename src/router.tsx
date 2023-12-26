import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Scrap from './pages/scrap';
import Layout from 'components/layouts/Layout';
import { PATHS } from 'constants/routesPath';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: PATHS.HOME,
        element: <Home />,
      },
      {
        path: PATHS.SCRAP,
        element: <Scrap />,
      },
    ],
  },
]);

export default router;
