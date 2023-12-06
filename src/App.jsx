import React from 'react'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RootLayout from './components/rootLayout/RootLayout';
import Friends from './pages/Friends';
import Message from './pages/Message';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path='/' element={<RootLayout/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/friends' element={<Friends/>}/>
          <Route path='/message' element={<Message/>}/>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
