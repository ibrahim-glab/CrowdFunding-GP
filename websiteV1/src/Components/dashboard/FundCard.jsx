import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { logo, tagType, thirdweb } from "../../assets";
import { BasecontractABI } from "../../constants";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  address,
  handleClick,
}) => {
  const [remainingDays, setRemainingDays] = useState(null);
  const { contract } = useContract(address, BasecontractABI);

  useEffect(() => {
    const calculateRemainingDays = () => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const daysInSeconds = 24 * 60 * 60; // Seconds in a day
      const remainingTimeInSeconds = deadline - currentTime;
      const remainingDays = Math.ceil(remainingTimeInSeconds / daysInSeconds);
      setRemainingDays(remainingDays);
      console.log(remainingDays);
    };

    calculateRemainingDays();

    const interval = setInterval(() => {
      calculateRemainingDays();
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [deadline]);

  const {
    data: status,
    isLoading,
    error,
  } = useContractRead(contract, "campaignStatus");

  const {
    data: totalContributions,
    isLoading: isLoadingTotalContributions,
    error: totalContributionsError,
  } = useContractRead(contract, "totalContributions");

  return (
    status === 0 && ( <div
      className="sm:w-[288px] cursor-pointer rounded-[15px] w-full bg-[#1c1c24]"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4">
        <div className="p-4 flex flex-row items-center mb-[18px] "></div>
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
              {totalContributions ? ethers.utils.formatEther(totalContributions) : 'Loading...'}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays < 0 ? "0" : remainingDays}
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
    </div>)
  );
};

export default FundCard;
