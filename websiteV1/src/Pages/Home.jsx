import React, { useState, useEffect } from 'react'
import { useContract , useContractRead } from '@thirdweb-dev/react';
import Campaigns from "../Components/dashboard/Campaigns";
// import { useStateContext } from '../context'
const Home = ({ campaigns }) => {

  
  const [isLoading, setIsLoading] = useState(false);
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
      campaigns={campaigns}
    />
  )
}

export default Home;