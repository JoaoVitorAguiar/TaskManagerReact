import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"

// Páginas
import Home from './routes/Home.jsx'
import NewTask from './routes/NewTask.jsx'
import Details from './routes/Details.jsx'
import Edit from './routes/Edit.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/new",
        element: <NewTask />
      },
      {
        path: "/details/:id",
        element: <Details />
      },
      {
        path: "/edit/:id",
        element: <Edit />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
