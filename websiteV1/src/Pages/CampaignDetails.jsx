import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { calculateBarPercentage } from "../../utils";
import { thirdweb } from "../assets";
import CountBox from "../Components/Details/CountBox";
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import {
  useContract,
  useContractEvents,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Loader from "../Components/Details/Loader";
import { BasecontractABI } from "../constants";

function CampaignDetails() {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");

  const add = useAddress();
  const difference = new Date(state.deadline).getTime() - Date.now();
  // Convert milliseconds to days
  const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
  // Calling Contribute Function
  const { contract } = useContract(state.address, BasecontractABI);

  // Fetch Contributors
  const {
    data: contributorsData,
    isLoading: isLoadingContributors,
    error: contributorsError,
  } = useContractEvents(contract, "ContributionReceived", {
    queryFilter: {
      fromBlock: 0, // Events starting from this block
      order: "asc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  });

  // Fetch Total Contributions
  const {
    data: totalContributions,
    isLoading: isLoadingTotalContributions,
    error: totalContributionsError,
  } = useContractRead(contract, "totalContributions");

  // Handle the onClick of the fund button
  const handleFund = async () => {
    setIsLoading(true);
    const amountInWei = ethers.utils.parseEther(amount); // Convert ETH to Wei
    // Call the contribute function on the contract with the address argument
    await contract.call("contribute", [add], { value: amountInWei });
    setIsLoading(false);
  };

  const uniqueContributors = contributorsData
    ? contributorsData.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.data.contributor === item.data.contributor)
      )
    : [];

  return (
    <div>
      {!isLoadingContributors || !isLoadingTotalContributions ? (
        <div>
          {isLoading && <Loader />}
          <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
              <img
                src={state.image}
                alt="campaign"
                className="w-full h-[410px] object-cover rounded-xl"
              />
              <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                <div
                  className="absolute h-full bg-[#4acd8d]"
                  style={{
                    width: `${calculateBarPercentage(
                      state.target,
                      ethers.utils.formatEther(totalContributions)
                    )}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </div>

            <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
              <CountBox title="Days Left" value={remainingDays} />
              <CountBox
                title={`Raised of ${state.target}`}
                value={ethers.utils.formatEther(totalContributions)}
              />
              <CountBox
                title="Total Backers"
                value={uniqueContributors.length}
              />
            </div>
          </div>

          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Creator
                </h4>

                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img
                      src={thirdweb}
                      alt="user"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                      {state.owner}
                    </h4>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Story
                </h4>

                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {state.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Donators
                </h4>

                <div className="mt-[20px] flex flex-col gap-4">
                  {uniqueContributors.length > 0 ? (
                    uniqueContributors.map((item, index) => (
                      <div
                        key={`${item.data.contributor}-${index}`}
                        className="flex justify-between items-center gap-4"
                      >
                        <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                          {index + 1}. {item.data.contributor}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      No donators yet. Be the first one!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Fund
              </h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                  Fund the campaign
                </p>
                <div className="mt-[30px]">
                  <input
                    type="number"
                    placeholder="ETH 0.1"
                    step="0.01"
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Support the project for no reward, just because it speaks
                      to you.
                    </p>
                  </div>
                  <Web3Button
                    contractAddress={state.address}
                    action={handleFund}
                    style={{ color: "white", backgroundColor: "#8c6dfd" }}
                    type="submit"
                    deadline
                  >
                    Fund Campaign
                  </Web3Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CampaignDetails;
