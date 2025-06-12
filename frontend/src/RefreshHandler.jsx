import React,{useEffect} from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';

function RefreshHandler({setisAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setisAuthenticated(true);
            if(
                location.pathname === "/" ||
                location.pathname === "/login" ||
                location.pathname === "/Signup"
            ){
                navigate("/Home",{replace:false});
            }
        }   
    },[location,navigate,setisAuthenticated])
  return (
    null
  )
}

export default RefreshHandler