import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login.tsx'
import Root from './pages/Root.tsx'
import {
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)