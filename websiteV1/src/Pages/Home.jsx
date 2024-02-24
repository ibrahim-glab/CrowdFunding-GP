import React, { useState, useEffect } from 'react'
import { useContract , useContractRead  ,useContractEvents , useAddress} from '@thirdweb-dev/react';
import { BasecontractABI, contractABI } from "../constants";
import Campaigns from "../Components/dashboard/Campaigns";
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// import { useStateContext } from '../context'
const Home = ({ campaigns }) => {
  const address = useAddress();
  const { contract } = useContract( "0x14f5c8fbba351ac74e1bfe5287c43de037b88a34", contractABI);
  console.log(contract);
//   const { data, isLoading1, error } = useContractRead(
//   contract,
//   "getDeployedProjects",
// );

// console.log(data);

const { contract: contract2 } = useContract("0xdeD74b8Dc8b7CdAAD3d2496F64B8c94A509C6a41", contractABI);


// const { data: data5, isLoading45, error6 } = useContractEvents(
//   contract2,
//   "CampaignCreated",
//   {
//     queryFilter: {
//       fromBlock: 0, // Events starting from this block
//       order: "asc", // Order of events ("asc" or "desc")
//     },
//     subscribe: true, // Subscribe to new events
//   },
// );
//retrive data of each campaign for a specific owner or Connected address wallet
const { data: data6, isLoading, error7 } = useContractEvents(
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
// const parsedCampaings = data6.map((campaign, i) => ({
//   owner: campaign.owner,
//   title: campaign.title,
//   description: campaign.description,
//   target: ethers.utils.formatEther(campaign.target.toString()),
//   deadline: campaign.deadline.toNumber(),
//   amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
//   image: campaign.image,
//   pId: i
// }));
console.log("User address data");
let parsedCampaigns = [];
console.log(data6); 
if (!isLoading && data6) { // Add null check for data6
  parsedCampaigns = data6.map((campaign, i) => {
    if (campaign.data) { // Add null check for campaign.data
      return {
        title: campaign.data.title,
        description: campaign.data.description,
        target: ethers.utils.formatEther(campaign.data.goal.toString()),
        deadline: campaign.data.durationInDays.toNumber(),
       amountCollected: 0.0,
        image: campaign.data.image,
        owner: campaign.data.owner,
      };
    } 

  });
  console.log(parsedCampaigns);
}

//console.log(parsedCampaings);

// if(data6 !== undefined){
//   console.log("User address data");
//   // all evnent data 
//   console.log(data6);
//   // data of 0 index
// console.log("this is data" + data6[0].data);
// }


  // const [campaigns, setCampaigns] = useState([]);

  // const { address, contract, getCampaigns } = useStateContext();

  //   const fetchCampaigns = async () => {
  //     setIsLoading(true);
  //     const data = await getCampaigns();
  //     setCampaigns(data);
  //     setIsLoading(false);
  //   }

  //   useEffect(() => {
  //     if(contract) fetchCampaigns();
  //   }, [address, contract]);



  return (
    <Campaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={parsedCampaigns}
    />
  )
}

export default Home;