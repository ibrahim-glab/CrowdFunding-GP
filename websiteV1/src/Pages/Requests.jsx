import { useState } from "react";
import "../style/all.min.css";
import Headerr from "../Components/history/Header";
import Table from "../Components/history/Table";
import { ethers } from "ethers";
import {
  useContract,
  useContractEvents,
  useAddress,
} from "@thirdweb-dev/react";
import { contractABI } from "../constants";
function Requests() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  const handleFilterChange = (selectedStatus) => {
    setFilter(selectedStatus);
  };

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  const { contract: contract2 } = useContract(
    import.meta.env.VITE_CONTRACTADDRESS,
    contractABI
  );
  const {
    data: data5,
    isLoading45,
    error6,
  } = useContractEvents(contract2, "CampaignCreated", {
    queryFilter: {
      fromBlock: 0, // Events starting from this block
      order: "asc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  });
  let reqData = [];
  let add = useAddress();
  if (data5) {
    reqData = data5
      .filter((campaign) => campaign.data.owner === add) // Filter out unverified campaigns
      .map((campaign) => {
        // Convert milliseconds to days and round up
        const date = new Date(campaign.data.durationInDays.toNumber());
        const dateString = date.toLocaleDateString();
        return {
          title: campaign.data.title,
          owner: campaign.data.owner,
          goal: ethers.utils.formatEther(campaign.data.goal.toString()),
          date: dateString,
          CampaignAddress: campaign.data.campaign,
        };
      });
  }
  const filteredData =
    filter === "All"
      ? reqData
      : reqData.filter((item) => item.status === filter);

  if (sort === "Newest") {
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sort === "Oldest") {
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return (
    <div className="container">
      <Headerr
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        pageTitle={"Requests"}
      />
      <Table data={filteredData} isRequestPage={true} />
    </div>
  );
}

export default Requests;
