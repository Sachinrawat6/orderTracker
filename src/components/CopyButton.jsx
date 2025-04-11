import { useState } from "react";

export default function AwbCopyBox({ delhiveryTracking }) {
  const awb = delhiveryTracking[0]?.Shipment.AWB || "";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(awb);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-md">
      <p className="text-sm">
        <span className="text-green-600 font-semibold ">AWB#</span> {awb}
      </p>
      <button
        onClick={copyToClipboard}
        className="text-xs text-white bg-green-500 cursor-pointer hover:bg-green-600 px-2 py-1 rounded"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
