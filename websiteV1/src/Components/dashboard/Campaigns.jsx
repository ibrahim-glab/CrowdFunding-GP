import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContract , useContractRead  ,useContractEvents , useAddress} from '@thirdweb-dev/react';
import { BasecontractABI, contractABI } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../../assets';
import { ethers } from 'ethers';

const Campaigns = ({ title, isLoading, campaigns }) => {
  //   const navigate = useNavigate();

  //   const handleNavigate = (campaign) => {
  //     navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  //   }

  // Show Data For Campigns addresses after retrive addresses use it in each Camp Component to retrive data for each one of them

  const address = useAddress();
  const { contract } = useContract( "0x14f5c8fbba351ac74e1bfe5287c43de037b88a34", contractABI);
  console.log(contract);
  const { data, isLoading1, error } = useContractRead(
  contract,
  "getDeployedProjects",
);
console.log(data);
/// show addresses for all  campigns

const { contract: contract2 } = useContract("0xdeD74b8Dc8b7CdAAD3d2496F64B8c94A509C6a41", contractABI);


const { data: data5, isLoading45, error6 } = useContractEvents(
  contract2,
  "CampaignCreated",
  {
    queryFilter: {
      fromBlock: 0, // Events starting from this block
      order: "asc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  },
);



//here display the data of  campaign Example
if(data5 !== undefined){
  // all evnent data 
  console.log(data5);
  // data of 0 index
console.log(data5[0].data);
}



// retrive data of each campaign for a specific owner or Connected address wallet
const { data: data6, isLoading453, error7 } = useContractEvents(
  contract2,
  "CampaignCreated",
  {
    queryFilter: {
      filters: {
        "owner": {address}, //filter by owner address from Connected wallet
      },
      fromBlock: 0, // Events starting from this block
      order: "asc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  },
);
console.log("User address data");
console.log(address);
console.log(data6);

if(data6 !== undefined){
  console.log("User address data");
  // all evnent data 
  console.log(data6);
  // data of 0 index
console.log(data6[0].data);
}



  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard
          key={uuidv4()}
          {...campaign}
        //handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default Campaigns; 