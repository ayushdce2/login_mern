import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { Link, Navigate } from 'react-router-dom';
import RefreshHandler from "./RefreshHandler";

function App() {
// const Navigate = useNavigate();
  const [isAuthenticated,setisAuthenticated]=useState(false);
  const PrivateRoute=({element})=>{
    return isAuthenticated ? element : <Navigate to="/Login" />
  }

  return (
    <>
    <RefreshHandler setisAuthenticated={setisAuthenticated}/>
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/Home' element={<PrivateRoute element={<Home/>}/>} />

    </Routes>
      
    </>
  )
}

export default App
