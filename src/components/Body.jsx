import React from 'react';
import Login from './Login.jsx';
import Browse from './Browse.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>,
        },
        {
            path:"/Browse",
            element:<Browse/>,
        }
    ])
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default Body