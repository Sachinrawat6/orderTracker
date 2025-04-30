import React, { useState } from "react";
import AwbCopyBox from "./CopyButton";
import TrackStatus from "./TrackStatus";

const CopyOfTracker = ({
  shiprocketEndpoint = "https://backend-hug2.onrender.com/track/shiprocket/",
  delhiveryEndpoint = "https://backend-hug2.onrender.com/track/delhivery",
  orderIdEndpoint = "https://backend-hug2.onrender.com/track/",
  shiprocketRedirect = "https://shiprocket.co/tracking/",
  orderIdRedirect = "https://qurvii.shiprocket.co/tracking/order/",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [delhiveryDisplay, setDelhiveryDisplay] = useState(false);
  const [delhiveryTracking, setDelhiveryTracking] = useState([]);

  const fetchTracking = async () => {
    setLoading(true);
    setError(false);
    setDelhiveryDisplay(false);

    const isAWB = /^\d+$/.test(inputValue);

    try {
      if (!inputValue) {
        alert("Please enter an AWB Number or Order ID");
        return;
      }

      if (isAWB) {
        const response = await fetch(`${shiprocketEndpoint}${inputValue}`);
        const result = await response.json();

        if (result.tracking_data?.track_url === "") {
          const delhiveryResponse = await fetch(
            `${delhiveryEndpoint}?trackingNumber=${inputValue}`
          );
          const delhiveryResult = await delhiveryResponse.json();

          if (
            delhiveryResult?.ShipmentData &&
            delhiveryResult.ShipmentData.length > 0 &&
            delhiveryResult.ShipmentData[0]?.Shipment?.AWB !== "0"
          ) {
            setDelhiveryTracking(delhiveryResult.ShipmentData);
            setDelhiveryDisplay(true);
          }
        } else {
          window.location.href = `${shiprocketRedirect}${inputValue}`;
        }
      } else {
        const response = await fetch(
          `${orderIdEndpoint}${inputValue.toUpperCase()}`
        );
        const result = await response.json();

        if (
          result?.ShipmentData &&
          result.ShipmentData.length > 0 &&
          result.ShipmentData[0]?.Shipment?.AWB !== "0"
        ) {
          setDelhiveryTracking(result.ShipmentData);
          setDelhiveryDisplay(true);
        } else {
          window.location.href = `${orderIdRedirect}${inputValue}`;
        }
      }
    } catch (err) {
      console.error("Tracking fetch error:", err);
      setError(true);
      setDelhiveryDisplay(false);
    } finally {
      setLoading(false);
    }
  };

  const moreDetails = () => {
    window.open(
      `https://www.delhivery.com/track-v2/package/${delhiveryTracking[0]?.Shipment.AWB}`,
      "_blank"
    );
  };

  const getDeliveryStatusMessage = () => {
    const shipment = delhiveryTracking[0]?.Shipment;
    const status = shipment?.Status?.Status;
    const deliveryDate = new Date(
      status === "Pending"
        ? shipment?.PromisedDeliveryDate
        : shipment?.Status?.StatusDateTime
    );

    if (!deliveryDate || isNaN(deliveryDate.getTime())) {
      return "Estimated delivery date is not available";
    }

    const today = new Date();
    deliveryDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (deliveryDate - today) / (1000 * 60 * 60 * 24)
    );
    const options = { day: "numeric", month: "long" };

    if (status === "Delivered") {
      return `Delivered on ${deliveryDate.toLocaleDateString(
        "en-US",
        options
      )}`;
    }

    if (diffDays < 0 && status !== "Delivered") {
      return "Estimated delivery date is not available";
    }

    if (diffDays === 0) {
      return "Arriving today";
    }

    if (diffDays === -1) {
      return "Arriving yesterday";
    }

    return `Arriving on ${deliveryDate.toLocaleDateString(
      "en-US",
      options
    )}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Track Your Shipment</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter AWB Number or Order ID
          </label>
          <input
            type="text"
            placeholder="e.g. QV12345 OR 1234567890 "
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <button
          onClick={fetchTracking}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md cursor-pointer font-medium text-white transition-colors ${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Tracking...
            </span>
          ) : (
            "Track Shipment"
          )}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">
            Something went wrong. Please try again.
          </div>
        )}
      </div>

      {/* Results Section */}
      {delhiveryDisplay && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Delivery Status Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-center text-green-600 mb-2">
              {getDeliveryStatusMessage()}
            </h2>
            <div className="flex justify-center my-4">
              <img 
                src="data:image/png;base64,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"
                alt="Delivery Van"
                className="h-16 w-auto"
              />
            </div>
          </div>

          {/* Tracking Status */}
          <div className="p-6">
            <TrackStatus data={delhiveryTracking} />
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <AwbCopyBox delhiveryTracking={delhiveryTracking} />
            
            <button
              onClick={moreDetails}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              View Full Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyOfTracker;