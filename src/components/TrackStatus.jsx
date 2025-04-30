import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

// Define the fixed status steps in order
const STATUS_STEPS = [
  "Ready to Ship",
  "Pickup Scheduled",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

// Utility function to get label from instructions
const getDisplayLabel = (instruction = "") => {
  if (/manifested/i.test(instruction)) return "Ready to Ship";
  if (/pickup scheduled/i.test(instruction)) return "Pickup Scheduled";
  if (/in transit|bag received|connected|received at facility/i.test(instruction)) return "In Transit";
  if (/out for delivery/i.test(instruction)) return "Out for Delivery";
  if (/delivered/i.test(instruction) || /shipment delivered/i.test(instruction)) return "Delivered";
  return null;
};

const TrackStatus = ({ data }) => {
  const shipment = data[0]?.Shipment;
  if (!shipment) return <p>No tracking data available.</p>;

  const achievedStatusSet = new Set(
    shipment.Scans
      .map(s => getDisplayLabel(s.ScanDetail.Instructions))
      .filter(label => label !== null)
  );

  const progressPercent = (Array.from(achievedStatusSet).length - 1) / (STATUS_STEPS.length - 1) * 100;

  return (
    <div className="bg-white p-6 rounded-2xl  max-w-5xl mx-auto">
      {/* <h2 className="text-2xl font-[400] mb-6">🛍️ Delhivery Status</h2> */}

      {/* Horizontal on desktop, vertical on mobile */}
      <div className="relative flex md:flex-row flex-col md:items-center items-start md:justify-between gap-6 mb-8">
        {/* Progress line - horizontal for md+, vertical for mobile */}
        <div className="absolute md:top-5 md:left-6 md:right-6  md:w-auto w-1 bg-gray-200 md:bg-gray-200 md:h-1 h-full left-5 top-7 md:static z-0">
          <div
            className="bg-green-500 md:h-1 h-full mt-1"
            style={{
              width: `calc(${progressPercent}% + 2px)`,
              height: `calc(${progressPercent}% + 2px)`,
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          ></div>
        </div>

        {STATUS_STEPS.map((step, index) => {
          const isActive = achievedStatusSet.has(step);
          return (
            <div
              key={step}
              className="z-10 flex md:flex-col  flex-row md:items-center items-start md:text-center text-left md:w-1/5 w-full gap-2"
            >
              <div className={`rounded-full p-2 ${isActive ? "text-green-600" : "text-gray-400"}`}>
                {isActive ? <CheckCircle2 size={28} /> : <Circle size={28} />}
              </div>
              <span className={`text-sm mt-4 md:truncate ${isActive ? "text-black font-semibold" : "text-gray-400"}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Current status summary */}
      <div className="mt-6 text-sm text-gray-700">
        <p><strong>Current Status:</strong> {getDisplayLabel(shipment.Status.Instructions) || shipment.Status.Instructions}</p>
        <p><strong>Location:</strong> {shipment.Status.StatusLocation}</p>
        <p><strong>Promise Delivery Date:</strong> {shipment?.PromisedDeliveryDate?.substring(0,10)}</p>
        <p><strong>Expected Delivery Date:</strong> {shipment?.ExpectedDeliveryDate?.substring(0,10)}</p>
       
      </div>
    </div>
  );
};

export default TrackStatus;
