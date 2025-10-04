import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {router} from './App.tsx'
import './App.css';
import { RouterProvider } from 'react-router';
import AuthProvider from './components/context/authContext.tsx';
createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>

)
