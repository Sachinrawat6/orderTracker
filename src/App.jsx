import React from "react";
import Tracker from "./components/Tracker";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CopyOfTracker from "./components/CopyOfTracker";
// import { ShipmentContextProvider } from './context/ProductContext'

const App = () => {
  return (
    <>
    <Navbar/>
      {/* <Tracker /> */}
      <CopyOfTracker/>
    <Footer/>
    </>
  );
};

export default App;
