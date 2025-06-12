import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from './Utils';
import {ToastContainer} from "react-toastify";
import axios from "axios";

const Home = () => {
  const [loggedInUser,setloggedInUser]=useState("");
  const [userProducts,setUserProducts]=useState([]);

  const navigate = useNavigate();
  useEffect(()=>{
    const storedUser = localStorage.getItem("loggedinuser");
    setloggedInUser(storedUser);
  });
  const handleLogout=()=>{
    localStorage.removeItem("loggedinuser");
    localStorage.removeItem("token");
            handleSuccess("LoggedOut Successfully");
    setTimeout(() => {
          navigate("/login");
        }, 1000);

  }
  const fetchUserProducts = async ()=>{
    try{
      const headers ={
      headers:{
        "Authorization":localStorage.getItem("token"),
      }
    }
    // const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/products",headers);
    const data = response.data;
    setUserProducts(data);
    console.log(data);
  }catch(error){
    console.log(error);
  }
  }
  useEffect(()=>{
    fetchUserProducts();
  },[])
  return (
    <>
    <div>{loggedInUser}</div>
    <button onClick={handleLogout}>LOGOUT</button>
    <div>
      <ul>
      {
        userProducts?.map((products,index)=>{
          
           return <li id={index}>{products.name} - {products.price}</li>
          
        })
      }
      </ul>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Home