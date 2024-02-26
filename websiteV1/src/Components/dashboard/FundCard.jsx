import React, { useState, useEffect } from "react";
import { tagType, thirdweb } from "../../assets";
import { useStorageUpload } from "@thirdweb-dev/react"; // Adjusted import statement

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  console.log("image  " + image )
  const [ipfsUrl, setIpfsUrl] = useState(""); // State to store IPFS URL



  const targetDate = new Date("2024-03-01");
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = targetDate - currentDate;

  // Convert milliseconds to days
  const remainingDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return (
    <div
      className=" sm:w-[288px] cursor-pointer rounded-[15px] w-full bg-[#1c1c24]"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className=" w-full h-[158px]  object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4">
        <div className="p-4 flex flex-row items-center mb-[18px] ">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Education
          </p>
        </div>
        {/* // section of title */}
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>
        {/* // section of target and amount collected */}
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>
        {/* // section of progress bar */}
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
        {/* //end of section */}
      </div>
    </div>
  );
};

export default FundCard;
