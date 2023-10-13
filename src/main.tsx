import React from 'react'
import ReactDOM from 'react-dom/client'
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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)