import { useState, useEffect } from "react";
import "../style/all.min.css";
import Headerr from "../Components/history/Header";
import Table from "../Components/history/Table";
import {
  useContract,
  useContractEvents,
  useAddress,
} from "@thirdweb-dev/react";
import { contractABI } from "../constants";
import { ethers } from "ethers";

function Hist() {
  const [sort, setSort] = useState("Newest");
  const add = useAddress();
  const { contract: contract2 } = useContract(
    import.meta.env.VITE_CONTRACTADDRESS,
    contractABI
  );
  const {
    data: data5,
    isLoading: isLoading45,
    error: error6,
  } = useContractEvents(contract2, "ContributionReceived", {
    queryFilter: {
      filter: { contributor: add },
      fromBlock: 0,
      order: "asc",
    },
    subscribe: true,
  });

  const [histData, setHistData] = useState([]);

  useEffect(() => {
    if (data5) {
      const updatedHistData = data5
        .filter((campaign) => campaign.data.contributor === add)
        .map((campaign) => ({
          title: campaign.data.Campaign,
          date: new Date(campaign.data.date.toNumber() * 1000).toLocaleDateString(),
          goal: ethers.utils.formatEther(campaign.data.amount.toString()),
          campaignAddress: campaign.data.Campaign,
        }));

      if (sort === "Newest") {
        updatedHistData.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sort === "Oldest") {
        updatedHistData.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      setHistData(updatedHistData);
    }
  }, [data5, add, sort]);

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

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
