import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {router} from './App.tsx'
import './App.css';
import { RouterProvider } from 'react-router';
import AuthProvider from './components/context/authContext.tsx';
import { register } from 'swiper/element/bundle'

register();
import 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Toaster} from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Toaster
      position='top-right'
      reverseOrder={false}
      />
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>

)
