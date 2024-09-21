import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Theme1Type from './Theme1.tsx';
import Theme2Type from './Theme2.tsx';
import Theme2TypeApi from './Theme2Api.tsx';
import Theme2Admin from './Theme2Admin.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/theme1',
    element: <Theme1Type />,
  },
  {
    path: '/theme2',
    element: <Theme2Type />,
  },
  {
    path: '/theme2api',
    element: <Theme2TypeApi />,
  },
  {
    path: '/theme2/gamst/admin',
    element: <Theme2Admin />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
