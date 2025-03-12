import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import MyTicketsPage from './pages/MyTicketsPage';
import AdminPage from './pages/AdminPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "events/:id",
        element: <EventDetailsPage />
      },
      {
        path: "my-tickets",
        element: <MyTicketsPage />
      },
      {
        path: "admin",
        element: <AdminPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);