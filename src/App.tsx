import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import CarDetails from "./pages/car";
import Dashboard from "./pages/dashboard";
import NewCar from "./pages/dashboard/new";
import Private from "./components/private/private";
import { NotFound } from "./pages/404";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
          {
            path: '/',
            element: <Home/>
          },
           {
            path: '/car/:id',
            element: <CarDetails/>
          },
           {
            path: '/dashboard',
            element: 
            <Private>
              <Dashboard/>
            </Private>
          },
           {
            path: '/dashboard/new',
            element: 
            <Private>
              <NewCar/>
            </Private>  
          },
            {
            path: '*',
            element: <NotFound/>
          },

        ]
    },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
     
])

export {router};