import React from "react";
import Tracker from "./components/Tracker";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CopyOfTracker from "./components/CopyOfTracker";
import TrackingComponent from "./components/TrackStatus";
// import { ShipmentContextProvider } from './context/ProductContext'

const App = () => {
  return (
    <>
    <Navbar/>
      {/* <Tracker /> */}
      <CopyOfTracker/>
      {/* <TrackingComponent/> */}
    <Footer/>
    </>
  );
};

export default App;
