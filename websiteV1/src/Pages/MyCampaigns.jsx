import React, { useState, useEffect } from "react";
import {
  useContract,
  useContractRead,
  useContractEvents,
  useAddress,
} from "@thirdweb-dev/react";
import { BasecontractABI, contractABI } from "../constants";
import Campaigns from "../Components/dashboard/Campaigns";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

// import { useStateContext } from '../context'
const MyCampaigns = ({ campaigns }) => {
  const address = useAddress();
  const { contract } = useContract(
    "0x14f5c8fbba351ac74e1bfe5287c43de037b88a34",
    contractABI
  );
  console.log(contract);

  const { contract: contract2 } = useContract(
    import.meta.env.VITE_CONTRACTADDRESS,
    contractABI
  );
  const {
    data: data6,
    isLoading,
    error7,
  } = useContractEvents(contract2, "CampaignCreated", {
    queryFilter: {
      filter: { "owner": address },
      fromBlock: 0, // Events starting from this block
      order: "asc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  });
  let parsedCampaigns = [];
  console.log(data6);
  if (!isLoading && data6) {
    // Add null check for data6
    parsedCampaigns = data6.filter((campaign) => campaign.data.owner === address)
    .map((campaign) =>{
      if (campaign.data) {
        // Add null check for campaign.data
        return {
          title: campaign.data.title,
          description: campaign.data.description,
          target: ethers.utils.formatEther(campaign.data.goal.toString()),
          deadline: campaign.data.durationInDays.toNumber(),
          amountCollected: 0.0,
          image: campaign.data.image,
          owner: campaign.data.owner,
          address: campaign.data.campaign,
        };
      }
    });
    console.log(parsedCampaigns);
  }

  return (
    <Campaigns
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={parsedCampaigns}
    />
  );
};

export default MyCampaigns;
