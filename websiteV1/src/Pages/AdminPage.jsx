import PendingRequests from "../Components/Admin/PendingRequests";
import Header from "../Components/history/Header"; // Corrected import name
import { useContract, useContractEvents, useContractRead } from "@thirdweb-dev/react";
import { contractABI } from "../constants";
import { BasecontractABI } from "../constants";

function AdminPage() {
    const { contract: contract2 } = useContract(import.meta.env.VITE_CONTRACTADDRESS, contractABI);
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
    const checkStatus = (add) => {
        const { contract } = useContract(
            add,
            BasecontractABI
        );
        const { data, isLoading, error } = useContractRead(
            contract,
            "campaignStatus",
        );
        return data;
    }
    console.log("Aaaaaaaaaa" + checkStatus("0x9672e9244dD76c5DB89D843B1D1aDC9c1FF29d2B"
    ))
    if (data5) {
        parsedCampaigns = data5
            .filter(campaign => campaign.data.verified === true) // Filter out unverified campaigns
            .map(campaign => ({
                title: campaign.data.title,
                owner: campaign.data.owner,
                CampaignAddress : campaign.data.campaign,
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