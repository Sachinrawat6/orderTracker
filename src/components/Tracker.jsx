import React, { useState } from "react";

const Tracker = () => {
  const [inputAwb, setInputAwb] = useState("");
  const [inputOrderID, setInputOrderID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tracking, setTracking] = useState([]);
  const [delhiveryDisplay,setDelhiveryDisplay] = useState(false);
  
  const fetchTracking = async () => {
    setLoading(true);
    setError(false);
    setDelhiveryDisplay(false);
  
    try {
      if (inputAwb !== "") {
        const response = await fetch(`https://backend-hug2.onrender.com/track/shiprocket/${inputAwb}`);
        const result = await response.json();
        setTracking(result);
  
        if (result.tracking_data?.track_url === "") {
          setDelhiveryDisplay(true);
        } else {
          window.location.href = `https://shiprocket.co/tracking/${inputAwb}`;
        }
      } else if (inputOrderID !== "") {
        window.location.href = `https://qurvii.shiprocket.co/tracking/order/${inputOrderID}`;
      } else {
        alert("Please enter either AWB number or Order ID");
        
      }
    } catch (err) {
      console.error("Tracking fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <>
      <div className="md:w-3xl w-[90vw] mx-auto mt-24 bg-gray-50 flex flex-col justify-center items-center py-4 rounded-xl ">
        <div className="flex gap-4 md:flex-row flex-col w-full px-4">
          <input
            type="text"
            placeholder="Enter AWB Number"
            value={inputAwb}
            onChange={(e)=>setInputAwb(e.target.value)}
            className="border border-gray-200 py-4 px-4 rounded-sm outline-blue-200 w-full"
          />
           <input
            type="text"
            placeholder="Enter Order ID"
            value={inputOrderID}
            onChange={(e)=>setInputOrderID(e.target.value)}
            className="border border-gray-200 py-4 px-4 rounded-sm outline-blue-200 w-full"
          />
        </div>

        <button
          className="border border-gray-200 rounded-sm mt-4 md:py-4 py-3 px-4 w-40 cursor-pointer bg-black text-[#f1f1f1]"
          onClick={fetchTracking}
        >
          Track
        </button>

        
        {error && (
          <p className="text-center mt-4 text-red-500">Something went wrong</p>
        )}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      <div className={` ${delhiveryDisplay?"block":"hidden"} md:container mx-auto w-full md:mt-10 mt-4   bg-red-300  overflow-hidden`}>
        {tracking?(
           <iframe
           className="w-full h-[50vh] md:mt-[-10.5rem] mt-[-10rem]"
           src={`https://www.delhivery.com/track-v2/package/${inputAwb}`}

            
           frameborder="0"
         ></iframe>
        ):""}
         
      </div>
    </>
  );
};

export default Tracker;
