import { PhoneCall } from "lucide-react";
import { MdOutlineWhatsapp } from "react-icons/md";

import React from "react";

const Footer = () => {
  return (
    <>
      <hr className="container mx-auto mt-8 text-gray-200" />
      <div className="bg-gray-10 px-4 mt-8 py-8 mx-auto flex flex-col gap-4 container   text-center rounded-md  w-[90vw] mb-4 text-gray-600 md:w-[90vw] md:flex-row justify-evenly ">
        <div>
          <h2 className="md:text-2xl font-[500] text-black  ">
            {" "}
            Qurvii Support{" "}
          </h2>
          <p className="text-[12px] md:text-[14px] truncate">
            Our team is here to assist you with your queries and support
            requests.{" "}
          </p>
          <p className="text-[12px] md:text-[14px]">
            Monday to Saturday, 10 AM to 6 PM{" "}
          </p>
          <a
            className="text-[12px] md:text-[14px] flex justify-center gap-2 items-center hover:text-gray-400 duration-75 "
            href="tel:+91 97170 79325"
          >
            <PhoneCall size={16} /> +91 9717079325
          </a>{" "}
          {/* <p className="text-[12px] md:text-[14px] flex justify-center gap-2 items-center hover:text-gray-400 duration-75 "> */}
          <a
            href="https://api.whatsapp.com/send/?phone=918178724107&text=Hi+Qurvii"
            className="text-[12px] md:text-[14px] flex justify-center gap-2 items-center hover:text-gray-400 duration-75"
          >
            <MdOutlineWhatsapp
              size={20}
              className="cursor-pointer hover:text-gray-400 duration-75"
            />{" "}
            +91 81787 24107
          </a>
          {/* </p> */}
        </div>

        <div>
          <h2 className="md:text-2xl font-[500] text-black  "> Address </h2>
          <p className="text-[12px] md:text-[14px]  ">
            Qurvii, B-149, 2nd Floor, Sector 6, Noida, 201301,{" "}
          </p>
        </div>

        <div>
          <h2 className="md:text-2xl font-[500] text-black  "> Email </h2>
          <a
            href="mailto:support@qurvii.com"
            className="text-[12px] md:text-[14px] hover:text-gray-400 duration-75"
          >
            Support@qurvii.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
