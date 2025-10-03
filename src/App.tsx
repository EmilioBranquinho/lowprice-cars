import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import CarDetails from "./pages/car";
import Dashboard from "./pages/dashboard";
import NewCar from "./pages/dashboard/new";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
          {
            path: '/',
            element: <Home/>
          },
           {
            path: '/car',
            element: <CarDetails/>
          },
           {
            path: '/dashboard',
            element: <Dashboard/>
          },
           {
            path: '/dashboard/new',
            element: <NewCar/>
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