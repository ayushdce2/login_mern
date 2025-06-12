import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import { handleError,handleSuccess } from './Utils';
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData,setformData]=useState({email:"",password:""});
  const handleChange = (e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }
  const handleLogin = async (e)=>{
    e.preventDefault();
    const {email,password}=formData;
    if(email===""||password===""){
        return handleError("All fields required")

    }
    try{
      const res = await axios.post("http://localhost:8000/auth/login",formData);
      const resJson = await res.data;
      // console.log(resJson,"<----------------------------responsone signup");
      console.log(resJson,"<----------------resposne LOCAL");
      const {message,success,error,jwtToken,name} =resJson;
      
      if(success){
        handleSuccess(message);
        localStorage.setItem("token",jwtToken);
        localStorage.setItem("loggedinuser",name);
        
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }else if(error){
        handleError(error?.details[0]?.message);
      }else if(!success){
        handleError(message);
      }
      // if(msg){
      //   handleError(msg);
      // }
      }catch(error){
        handleError(error);
      }
  }
  return (
    <>
        <form onSubmit={handleLogin}>
            <div>
                
                    <input
                    type='text'
                    name='email'
                    placeholder='email'
                    onChange={handleChange}
                    />
                    <input
                    type='text'
                    name='password'
                    placeholder='password'
                    onChange={handleChange}
                    />
            </div>
            <button type='submit'>LOGIN</button>
            <span>
                Don't have account <Link to="/Signup">Signup</Link>
            </span>
        </form>
        <ToastContainer/>
    </>
  )
}

export default Login;