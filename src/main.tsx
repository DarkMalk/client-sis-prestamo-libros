import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { router } from './router'
import React from 'react'
import '@picocss/pico'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
