import React, { createContext, useContext, useState } from "react";



const ShipmentContext = createContext();
const ShipmentContextProvider = ({children})=>{

const [loading,setLoading] = useState(false);
const[error,setError] = useState(false);
const [tracking,setTracking] =useState([]);
let [awb,setAwb] = useState();

const API_URL = "https://backend-hug2.onrender.com/track/shiprocket/";


const fetchTracking = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`${API_URL}${awb}`);
      const contentType = response.headers.get("content-type");
  
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format — not JSON");
      }
  
      const result = await response.json();
      setTracking(result);
    } catch (err) {
      console.error("Tracking fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  


  


    return <ShipmentContext.Provider value={{loading,error,tracking,setAwb ,setLoading, fetchTracking}}>
        {children}
    </ShipmentContext.Provider>
}



const useGlobalContext = ()=>{
    return useContext(ShipmentContext)
}

export {ShipmentContextProvider,useGlobalContext}