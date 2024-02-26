import PendingRequests from "../Components/Admin/PendingRequests";
import Header from "../Components/history/Header"; // Corrected import name
import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { contractABI } from "../constants";

function AdminPage() {
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

    console.log(data5); // Check what data you're receiving

    let parsedCampaigns = [];

    if (data5) {
        parsedCampaigns = data5
            .filter(campaign => campaign.data && campaign.data.verified === true) // Filter out unverified campaigns
            .map(campaign => ({
                title: campaign.data.title,
                owner: campaign.data.owner,
                status: campaign.data.campaignStatus,
            }));
        console.log(parsedCampaigns);
    }

    return (
        <>
            <PendingRequests campaigns={parsedCampaigns} />
        </>
    );
}

export default AdminPage;
