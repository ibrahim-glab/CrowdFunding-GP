import React, { useState, useEffect } from "react";
import Campaigns from "../Components/dashboard/Campaigns";
import { ethers } from "ethers";

const Home = ({searchQuery}) => {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('/api/campaigns');
                const data = await response.json();
                console.log(data);
                const parsedCampaigns = data.map(item => ({
                    title: item.args[2],
                    description: item.args[3],
                    target: ethers.utils.formatEther(item.args[6].hex),
                    deadline: ethers.BigNumber.from(item.args[5].hex).toNumber(),
                    amountCollected: 0.0, // You can set this value based on your requirement
                    image: item.args[4],
                    owner: item.args[0],
                    address: item.args[1],
                }));
                setCampaigns(parsedCampaigns);
                console.log(parsedCampaigns);
            } catch (error) {
                console.error('Failed to fetch campaigns:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCampaigns();
    }, []);
    const filteredCampaigns = campaigns.filter(campaign => 
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return (
        <Campaigns
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={filteredCampaigns}
        />
    );
};

export default Home;
