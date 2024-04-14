import { createBrowserRouter } from 'react-router-dom'
import CardMain from '../pages/CardMain'
import OnBoarding from '../pages/OnBoarding'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CardMain />
  },
  {
    path: '/OnBoarding',
    element: <OnBoarding />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
    ]
  },
])