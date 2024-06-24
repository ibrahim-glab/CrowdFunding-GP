import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { BasecontractABI } from "../../constants";

function Data({
  owner,
  CampaignAddress,
  title,
  date,
  goal,
  index,
  deadline,
  statusFilter,
  isRequestPage,
}) {
  const { contract } = useContract(CampaignAddress, BasecontractABI);
  const { data: status } = useContractRead(contract, "campaignStatus");
  const { data: totalContributions } = useContractRead(
    contract,
    "totalContributions"
  );

  const statusMap = {
    0: "Active",
    1: "Successful",
    2: "Pending",
    3: "Failed",
    4: "Denied",
  };

  let statusInLetters = "";
  if (status !== undefined && statusMap.hasOwnProperty(status)) {
    statusInLetters = statusMap[status];
  }
  if (deadline <= 0 && totalContributions < goal) {
    statusInLetters = statusMap[3];
  }
  if (deadline <= 0 && totalContributions >= goal) {
    statusInLetters = statusMap[1];
  }

  const shouldRenderRow =
    !statusFilter || statusFilter === "All" || statusInLetters === statusFilter;

  const renderRow = shouldRenderRow && (
    <tr className={`data-row ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
      {owner && <td>{owner}</td>}
      <td>
        <a href="#">{title}</a>
      </td>
      <td>{date}</td>
      <td>{goal} ETH</td>
      {status !== undefined && <td>{statusInLetters}</td>}
    </tr>
  );

  const rendersRow = (
    <tr className={`data-row ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
      {owner && <td>{owner}</td>}
      <td>
        <a href="#">{title}</a>
      </td>
      <td>{date}</td>
      <td>{goal} ETH</td>
      {status !== undefined && <td>{statusInLetters}</td>}
    </tr>
  );
  return <>{isRequestPage === true ? renderRow : rendersRow}</>;
}

export default Data;
