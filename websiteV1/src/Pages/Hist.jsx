import { histData } from "../../data";
import { useState } from "react";
import { histHeader } from "../../data";
import "../style/all.min.css";
import Headerr from "../Components/history/Header";
import Table from "../Components/history/Table";
import {
  useContract,
  useContractRead,
  useContractEvents,
  useAddress,
} from "@thirdweb-dev/react";
import { contractABI } from "../constants";
import { ethers } from "ethers";
function Hist() {
  const [sort, setSort] = useState("Newest");

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };
  const add = useAddress();
  const { contract: contract2 } = useContract(
    import.meta.env.VITE_CONTRACTADDRESS,
    contractABI
  );
  const {
    data: data5,
    isLoading45,
    error6,
  } = useContractEvents(contract2, "ContributionReceived", {
    queryFilter: {
      filter: { "contributor": add },
      fromBlock: 0, // Events starting from this block
      order: "asc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  });
  console.log(data5)
  let histData = [];
  if (data5) {
    histData = data5.map((campaign) => {
      const unixTimestamp = campaign.data.date.toNumber();
      const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
      const formattedDate = date.toLocaleDateString();
      console.log(date)
      return {
        title : campaign.data.Campaign,
        date: formattedDate,
        goal :ethers.utils.formatEther(campaign.data.amount.toString()),
        campaignAddress: campaign.data.Campaign,
      };
    });
  }

  if (sort === "Newest") {
    histData.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sort === "Oldest") {
    histData.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return (
    <div className="container">
      <Headerr
        onSortChange={handleSortChange}
        pageTitle={"History Of Transactions"}
      />
      <Table data={histData} isRequestPage={false} />
    </div>
  );
}

export default Hist;
