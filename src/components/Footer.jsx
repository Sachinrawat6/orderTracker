import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 px-4 mt-8 py-8 mx-auto flex flex-col gap-4 md:text-left text-center rounded-md  w-[90vw] mb-4 text-gray-600 md:w-[90vw] md:flex-row justify-evenly                                                                                           ">
      <div>
        <h2 className="md:text-2xl font-bold text-gray-600  "> Customer Support Hours </h2>
        <p className="text-[12px] md:text-[16px]">Monday to Saturday, 10 AM to 6 PM </p>
        <p className="text-[12px] md:text-[16px]"> Call us at: +91 97170 79325 </p>
        <p className="text-[12px] md:text-[16px]">
          Our team is here to assist you with your queries and support requests.{" "}
        </p>
      </div>

      <div>
        <h2 className="md:text-2xl font-bold text-gray-600  "> Address </h2>
        <p className="text-[12px] md:text-[16px]">Qurvii, B-149, 2nd Floor, Sector 6, Noida, 201301, </p>
      </div>

      <div>
        <h2 className="md:text-2xl font-bold text-gray-600  "> Email </h2>
        <p className="text-[12px] md:text-[16px]">Support@qurvii.com </p>
      </div>
    </div>
  );
};

export default Footer;
