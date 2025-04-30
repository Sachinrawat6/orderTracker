import { PhoneCall } from "lucide-react";
import { MdOutlineWhatsapp } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <hr className="container mx-auto border-gray-200" />
      <div className="container mx-auto px-4 py-8 flex flex-col gap-8 md:flex-row justify-between">
        {/* Support Section */}
        <div className="flex-1 max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Qurvii Support</h2>
          <p className="text-sm text-gray-600 mb-2">
            Our team is here to assist you with your queries and support requests.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Monday to Saturday, 10 AM to 6 PM
          </p>
          <div className="space-y-2">
            <a
              href="tel:+91 97170 79325"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <PhoneCall size={16} className="text-gray-700" />
              +91 9717079325
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=918178724107&text=Hi+Qurvii"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <MdOutlineWhatsapp size={18} className="text-gray-700" />
              +91 81787 24107
            </a>
          </div>
        </div>

        {/* Address Section */}
        <div className="flex-1 max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Address</h2>
          <address className="text-sm text-gray-600 not-italic">
            Qurvii, B-149, 2nd Floor,<br />
            Sector 6, Noida,<br />
            201301, Uttar Pradesh, India
          </address>
        </div>

        {/* Email Section */}
        <div className="flex-1 max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Email</h2>
          <a
            href="mailto:support@qurvii.com"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            support@qurvii.com
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Qurvii. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;