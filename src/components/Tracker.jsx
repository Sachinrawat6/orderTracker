import React, { useState } from "react";

const Tracker = () => {
  const [inputAwb, setInputAwb] = useState("");
  const [inputOrderID, setInputOrderID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tracking, setTracking] = useState([]);
  const [delhiveryDisplay, setDelhiveryDisplay] = useState(false);
  const [delhiveryTracking, setDelhiveryTracking] = useState([]);

  const fetchTracking = async () => {
    setLoading(true);
    setError(false);
    setDelhiveryDisplay(false);

    try {
      if (inputAwb !== "") {
        const response = await fetch(
          `https://backend-hug2.onrender.com/track/shiprocket/${inputAwb}`
        );
        const result = await response.json();
        setTracking(result);

        if (result.tracking_data?.track_url === "") {
          const response = await fetch(
            `https://backend-hug2.onrender.com/track/delhivery?trackingNumber=${inputAwb}`
          );
          const result = await response.json();
          setDelhiveryTracking(result.ShipmentData);
          // console.log(result.ShipmentData);

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

  const now = new Date();
  let dd = delhiveryTracking[0]?.Shipment.PromisedDeliveryDate;
  const target = new Date(dd);

  // Difference in milliseconds
  const diffMs = target - now;

  // Convert milliseconds to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  console.log(`Days left: ${diffDays}`);

  return (
    <>
      <div className="md:w-3xl w-[90vw] mx-auto mt-24 bg-gray-50 flex flex-col justify-center items-center py-4 rounded-xl ">
        <div className="flex gap-4 md:flex-row flex-col w-full px-4">
          <input
            type="text"
            placeholder="Enter AWB Number"
            value={inputAwb}
            onChange={(e) => setInputAwb(e.target.value)}
            className="border border-gray-200 py-4 px-4 rounded-sm outline-blue-200 w-full"
          />
          <input
            type="text"
            placeholder="Enter Order ID"
            value={inputOrderID}
            onChange={(e) => setInputOrderID(e.target.value)}
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

      {/* custom status display  */}

      <div
        className={` ${
          delhiveryDisplay ? "block" : "hidden"
        } md:container mx-auto w-full md:mt-10 mt-4 px-4 `}
      >
        <div className="h-20  flex flex-col  "></div>
        <div className="bg-grays-100  mt-[-4rem] ">
          <p className="text-center text-green-400 md:text-2xl animate-pulse">
            {(() => {
              const deliveryDate = new Date(
                delhiveryTracking[0]?.Shipment.PromisedDeliveryDate
              );
              const today = new Date();

              // Remove time part for accurate day difference
              deliveryDate.setHours(0, 0, 0, 0);
              today.setHours(0, 0, 0, 0);

              const diffDays = Math.abs(
                (deliveryDate - today) / (1000 * 60 * 60 * 24)
              );

              if (diffDays === 0) return "Arriving today";
              if (diffDays === 1) return "Arriving Yesterday";

              // Format date like '11 March'
              const options = { day: "numeric", month: "long" };
              return `Arriving On ${deliveryDate.toLocaleDateString("en-US", options)}`;
            })()}
          </p>

          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA7CAYAAADIO4L0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAjSSURBVHgB7VltbFPXGX7u9fVHYoc4gJOQFjCk0DUtSTqt6jTB8NgX5U+7rUHbNA2YVGli2lImrdOmaTFo+7sOEFO1VRtsQ52adsCPtrSbihHthNRqDZVAG+uKKctIAkkcYjvx/dz7nuvr2Klt8smy6T5w4nuOr885z/t97gVcuHDhwoULFy5cuHDhwoULFy5cuHDhwoWL/x9IxZ3B7dt7aCCGJYLhVGrPfefPJ7HAUJyL69u3RyVJimMJIRAIPEYfP8cCQ8YShizLYSwC5kRa03XohgHLsvC/CAVzgEaEVSLO8MiyaIrHU7he6pgT6WIYpimaIwSKC7YQigTBY/MFWVXxJGxihT7NPyuTmzfp6WCTZ9PnBk0TY0xcniaIWcxXIrH9+/dzX+rp6SncAlsAFq89EwFXJe256y5Yqgrzxg3MB441sAhk2tSy2tqZ/dAWjmDR29srRSKRErI0Jr6Px+MWj89U41VJKxs2wNPYaG98aAhWKiU+JWoYG8Nigyl3PvRIN7EJk6VIZCVjHs/hMcWDpA4D9f665OnTv0vmb2dNS6zp/EXFeauSlkOhwrUgT03ZuBFaXx+0S5dg5nJYTJhMQbJ2WbA6LNOCSVIwVB0qbDcayg7jwYd3cO+CaVpJSzJO0fhR5M290rzVfdrrLTsc6uwUTR8dhXb9OnIDA9BGRqCNj2MhQTuXSGdhSeZgJWPN2lYEg3XQdY3CBTcVk5MT0FS149atVIeqWo+2f+xzW999+7U91eatSlqqQLrw44YG0Wra2kTfzGSgDg9DGxy0P0kY5nxyuR3568myKQAqCIWWwR+oYQmgffgaVtV58VZkDW5YHtwY7IdK8WdgoH9X2wOb+0jjh+i3Ztl9Y46Ey+4xGESA25o1hTEWgE4CcKzBpI1577+/ECOsfISvuA8JYfZPiYjzp5yP/Otbm5FZHsHwe6NkERYCNUHUkBVksuNI6erTnQ999iwR77PnKA1wlTXt82Eh4G1qEs2xBibJAmXiDJNcxCTy2sWLsLLZ287HxFdlR7Gx4148d/WWEAZM9kQvxsfHsKwujH8l/w7Z43mabv+UWNMOcAXiFRPmXDQ9E0yfV2YXWbeuJGg6eE+31k4f4wD26Q8uACdPIJh8385n9KcmGMLkRIbcyRD3eb01Wze0fby7eOnCmqgAlv7EiRPIJRJCC5yrb2eKCw6TQ7AliHLLTqQh5zKo9/nh29SG2LoV4jaHDQe44kTl99X2tLdvEYeW4nNC1UDGJNn3uDFxBmtGpuJCjkTsa/pcEH7pdPk95AkbVOFdI80O+LzY5w8hfHkEjfUa2G6GJoGg34taKn9M1IjfCf9XvOGcqv6MrvcUV3azLkOFD1JDf39hTJCvr4dMedwTDkMKL8yJ0KR/FkVmQZzyNJ3tYEwayFF9kCYh3Ry7JaI6R7sBSl3DNwfx0YfvwwMdPiJMFcz7/yBTlnff2/7JAzRdEnMlXXZzjiCSSdFnv2VBMHkualggEkX1aigXxGRLEvW0yYlHNiGZFMFF9paE5vX8IUdRFPi8foQb2NwlrGxqoe911Nb2I23SEdgw2Lf3IV+0LPiBQxDIuwWo6ZcvizEmzVbguAULZGbBks2b/FUzoHgV4eP8XxKJyvZT1VBJ+yo4n//t4l/zlmHYPk5FjeSVt4qZbL+WFoV02a1T4aJTK+sWFdyBFUzlpTh3cGoyDLPoFMUnqtL7bcXbDzcmsmPgJOWvXUYCMMUCTtq6Y6TLoeAWVcAkmbgoUCSrKApLKC728geNQt8fCMEpwem7aPGc/1XSt4Ns6Y9yIHO0y5zsM3Ppfdy3BSN6fCdZhweAIyQJMypOlgJom4Uc6zS7X5p3ncvScfv+1tb1+MmBH2F01Cr4UEHT9Lg1peVySbqMVtrEqOJHgKJmjaVjvuDnbNXAB5UJCts+X01eazYUxUtaNaiZghSftEoFYAe+Ka3TmbxjEyYxyaRTU6N5bP7M47FGC2eKx3jBcEMEFhfzecMIWrRgOoXU6PyeqFSDYTFxExPwQKdzwMpIC0VvX2FPJqUkXj9N9XY2mxG5uxhMekoWUt/Fd/70oNP7kE8PWVMWzyealrvXYyhDJ5drV7B+3WoqCrL450gKy1c0w4zcjZtD/8aigdKNQmmtuWUtbo2NkBQ0NEaWiz3cpD00Nq0WmmfwsbKcyYtrWCWPeUpIm7qUIp5nnX7DiqaO9HgqvLIhhGcOHsKqZrvkfPnVBA7/4hhCyxpRGwwls5n0VR73+QMdsjTzB/RUYCQ1LXe1zFdbnQu2MibcurYZPz3wPdSF7Odrz7/4Eo48cxwtq9cLbfv9AZGXy4HCmBWLPRZOJE6mPkT6L4lePn/GnP5XvvHjK/0fXA7/8nAcfe9eQvd3e9FMxH/4/b3o+uIOPNf7Cppa1iaO/younlR87Yn4GczmXZiFY79/Nh6fPrx5Wxe9ypG62YwDgSAUScMPntqL068l0PvCy+jsbMN39u4WGn/x1OsI1dXnCddUWik2aaoFn64YvXd/Mx7V1Ilo+6aPCA0fPnIU1wdv4J0Ll/DrY73Y+aUdUHOTYkIsMN54vfdJUk7C5wuI4+KGe6JCw4eOHBN7eOXVs0LTj3w+hiy5HlnYrOavmKepuonqVE6yNNPpDMbTU7WxGMtkRRQ1dC3qjJNPnSINXcUMQS7bV+k7xdC+EF4eeZJI94SIcPH6U3vICA1zhJ8NKpJWdPSNj48cnJzwdDPBPV9/HL/57Qtoborg23t34dybb9k3WkbhIdzxZ/cv2BtG9j+ytqOjIwPhc2++3c3m7OzhntYousjSev/4ElffScXj3aebcl+1+c4nTiZnsi7Y+bds23ml66vfsq4PDFkOKJBZm7fttGzfW1zwHmit0T1PPFWyBzJvew+xnXHMErd9BxKLfTlqyOYZkmh0FWmZTYpNjaqlY+fOPL8bdwCfiHV1emTpxPQ9kJkdFP4/S8z4zdqWbV27adFO0ZE9J9/48x8SuIOwhW/ETEuKURmdms8e/gPf6jivlbz4uAAAAABJRU5ErkJggg=="
            className="mt-10 w-20  van              "
          />
          <hr className="text-red-300 md:max-w-[70vw] border-2 rounded-r-2xl line mt-[-4px]" />
        </div>

        <p className="relative top-4 ">
          {" "}
          <span className="text-green-300 text-sm">AWB#</span>{" "}
          {delhiveryTracking[0]?.Shipment.AWB}{" "}
        </p>
      </div>

    </>
  );
};

export default Tracker;
