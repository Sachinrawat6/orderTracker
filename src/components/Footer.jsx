import React from "react";

const Footer = () => {
  return (
    <>
    <hr className="mt-6 text-gray-200" /> 
    <div className="bg-gray-10 px-4 mt-8 py-8 mx-auto flex flex-col gap-4  text-center rounded-md  w-[90vw] mb-4 text-gray-600 md:w-[90vw] md:flex-row justify-evenly ">
     

      <div>
        <h2 className="md:text-2xl font-[500] text-black  "> Address </h2>
        <p className="text-[12px] md:text-[14px] ">
          Qurvii, B-149, 2nd Floor, Sector 6, Noida, 201301,{" "}
        </p>
      </div>

      <div>
        <h2 className="md:text-2xl font-[500] text-black  ">
          {" "}
        Qurvii  Customer Support Hours{" "}
        </h2>
        <p className="text-[12px] md:text-[14px] ">
          Our team is here to assist you with your queries and support requests.{" "}
        </p>
        <p className="text-[12px] md:text-[14px]">
          Monday to Saturday, 10 AM to 6 PM{" "}
        </p>
        <p className="text-[12px] md:text-[14px]">
          {" "}
          Call us at:<b> +91 97170 79325{" "}</b>
        </p>
       
      </div>

      <div>
        <h2 className="md:text-2xl font-[500] text-black  "> Email </h2>
        <p className="text-[12px] md:text-[14px]">Support@qurvii.com </p>
      </div>
    </div>
    </>
  );
};

export default Footer;
