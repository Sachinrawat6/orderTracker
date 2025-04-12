// import React, { useState } from "react";
// import AwbCopyBox from "./CopyButton";

// const CopyOfTracker = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [delhiveryDisplay, setDelhiveryDisplay] = useState(false);
//   const [delhiveryTracking, setDelhiveryTracking] = useState([]);

//   const fetchTracking = async () => {
//     setLoading(true);
//     setError(false);
//     setDelhiveryDisplay(false);

//     const isAWB = /^\d+$/.test(inputValue); // Only digits = AWB, else Order ID

//     try {
//       if (!inputValue) {
//         alert("Please enter an AWB Number or Order ID");
//         return;
//       }

//       if (isAWB) {
//         const response = await fetch(
//           `https://backend-hug2.onrender.com/track/shiprocket/${inputValue}`
//         );
//         const result = await response.json();

//         if (result.tracking_data?.track_url === "") {
//           const delhiveryResponse = await fetch(
//             `https://backend-hug2.onrender.com/track/delhivery?trackingNumber=${inputValue}`
//           );
//           const delhiveryResult = await delhiveryResponse.json();
//           if (
//             delhiveryResult?.ShipmentData &&
//             delhiveryResult.ShipmentData.length > 0 &&
//             delhiveryResult.ShipmentData[0]?.Shipment?.AWB !== "0"
//           ) {
//             setDelhiveryTracking(delhiveryResult.ShipmentData);
//             setDelhiveryDisplay(true);
//           }
//         } else {
//           window.location.href = `https://shiprocket.co/tracking/${inputValue}`;
//         }
//       } else {
//         const response = await fetch(
//           `https://backend-hug2.onrender.com/track/${inputValue.toUpperCase()}`
//         );
//         const result = await response.json();

//         if (
//           result?.ShipmentData &&
//           result.ShipmentData.length > 0 &&
//           result.ShipmentData[0]?.Shipment?.AWB !== "0"
//         ) {
//           setDelhiveryTracking(result.ShipmentData);
//           setDelhiveryDisplay(true);
//         } else {
//           window.location.href = `https://qurvii.shiprocket.co/tracking/order/${inputValue}`;
//         }
//       }
//     } catch (err) {
//       console.error("Tracking fetch error:", err);
//       setError(true);
//       setDelhiveryDisplay(false);
//     } finally {
//       setLoading(false);
//     }
//   };

// const moreDetails = ()=>{
//   window.open(`https://www.delhivery.com/track-v2/package/${delhiveryTracking[0]?.Shipment.AWB}`, '_blank');

// }

//   return (
//     <>
//       <div className="md:w-3xl w-[90vw] mx-auto mt-24 bg-gray-50 flex flex-col justify-center items-center py-4 rounded-xl ">
//         <div className="flex gap-4 w-full px-4">
//           <input
//             type="text"
//             placeholder="Enter AWB Number or Order ID"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="border border-gray-200 py-4 px-4 rounded-sm  w-full"
//           />
//         </div>

//         <button
//           className="border border-gray-200 rounded-sm mt-4 md:py-4 py-3 px-4 w-40 cursor-pointer bg-black text-[#f1f1f1]"
//           onClick={fetchTracking}
//         >
//           Track
//         </button>

//         {error && (
//           <p className="text-center mt-4 text-red-500">Something went wrong</p>
//         )}
//       </div>

//       {loading && <p className="text-center mt-4">Loading...</p>}

//       {/* Display tracking result here */}
//       <div
//         className={` ${
//           delhiveryDisplay ? "block" : "hidden"
//         } md:container mx-auto w-full md:mt-10 mt-4 px-4 `}
//       >
//         {/* Existing delhivery tracking UI (unchanged) */}
//         {/* You can keep your custom UI here as-is */}
//         <div className="h-20  flex flex-col  "></div>
//         <div className="bg-grays-100  mt-[-4rem] ">
//           <p className="text-center text-green-400 md:text-2xl animate-pulse">
//             {(() => {
//               const shipment = delhiveryTracking[0]?.Shipment;
//               const status = shipment?.Status?.Status;
//               const deliveryDate = new Date(
//                 status === "Pending"
//                   ? shipment?.PromisedDeliveryDate
//                   : shipment?.Status?.StatusDateTime
//               );
//               const today = new Date();
//               deliveryDate.setHours(0, 0, 0, 0);
//               today.setHours(0, 0, 0, 0);
//               const diffDays = Math.abs(
//                 (deliveryDate - today) / (1000 * 60 * 60 * 24)
//               );
//               const options = { day: "numeric", month: "long" };

//               if (status === "Delivered") {
//                 return `Delivered on ${deliveryDate.toLocaleDateString(
//                   "en-US",
//                   options
//                 )}`;
//               }

//               if (diffDays === 0 && status !== "Delivered") {
//                 return "Arriving today";
//               }

//               if (diffDays === 1 && status !== "Delivered") {
//                 return "Arriving yesterday";
//               }

//               return `Arriving on ${deliveryDate.toLocaleDateString(
//                 "en-US",
//                 options
//               )}`;
//             })()}
//           </p>

//           <img
//             src="data:image/png;base64,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"
//             className="mt-10 w-20 van"
//             alt="Van Icon"
//           />
//           <hr className="text-red-300 md:max-w-[70vw] border-2 rounded-r-2xl line mt-[-4px]" />
//         </div>

//         <div className="flex md:flex-row flex-col gap-4 md:justify-between items-center mt-4">
//           <AwbCopyBox delhiveryTracking={delhiveryTracking} />
//           <p className="bg-gray-50 p-4 rounded-md text-sm">
//             <span
//               className={
//                 delhiveryTracking[0]?.Shipment.Status.Status !== "Delivered"
//                   ? "text-red-500"
//                   : "text-green-500"
//               }
//             >
//               {delhiveryTracking[0]?.Shipment.Status.Status !== "Delivered"
//                 ? delhiveryTracking[0]?.Shipment.Status.Status
//                 : "DELIVERED"}
//             </span>
//             <br />
//             {delhiveryTracking[0]?.Shipment.Status.Instructions}
//             <br />
//             <span className="text-green-400">Location: </span>
//             {delhiveryTracking[0]?.Shipment.Status.StatusLocation}
//           </p>
//           <div>
//             <button className="bg-green-200 py-2 px-4 cursor-pointer rounded-sm shadow" onClick={moreDetails} >More details</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CopyOfTracker;

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

    const isAWB = /^\d+$/.test(inputValue); // Only digits = AWB, else Order ID

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

  return (
    <>
      <div className="md:w-xl w-[90vw] mx-auto mt-24 bg-gray-50 flex flex-col justify-center items-center py-4 rounded-xl ">
        <div className="flex gap-4 w-full px-4">
          <input
            type="text"
            placeholder="Enter AWB Number or Order ID"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-200 md:py-4 py-3 px-4 rounded-sm bg-white  w-full"
          />
        </div>

        <button
          className="border border-gray-200 rounded-sm mt-4 md:py-4 py-3 px-4 md:w-40 w-25 cursor-pointer bg-black text-[#f1f1f1]"
          onClick={fetchTracking}
        >
          Track
        </button>

        {error && (
          <p className="text-center mt-4 text-red-500">Something went wrong</p>
        )}
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}

      {delhiveryDisplay && (
        <div className="md:container mx-auto w-full md:mt-10 mt-4 px-4">
          <div>
           

            <p className="text-center animate-pulse duration-200 text-green-500 md:text-2xl">
              {(() => {
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

                // Delivery missed but not delivered
                if (diffDays < 0 && status !== "Delivered") {
                  return "Estimated delivery date is not available ";
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
              })()}
            </p>

            <img
              src="data:image/png;base64,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"
              className=" w-20 van"
              alt="Van Icon"
            />
            <hr className="text-red-300 md:max-w-[70vw] border-2 rounded-r-2xl mt-[-4px]" />
          </div>

          <div className="flex md:flex-row flex-col gap-4 md:justify-between items-center mt-4"></div>

          <div className="right">
            <TrackStatus data={delhiveryTracking} />
          </div>
          <hr className="text-gray-200 mb-4" />

          <div className="w-full flex justify-center md:flex-row flex-col  gap-4">
            <AwbCopyBox delhiveryTracking={delhiveryTracking} />
            <button
              className="bg-green-200 py-2 px-4 cursor-pointer  rounded-sm shadow"
              onClick={moreDetails}
            >
              More details
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CopyOfTracker;
