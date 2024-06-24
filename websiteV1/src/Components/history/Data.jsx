import { useContract, useContractRead } from "@thirdweb-dev/react";
import { BasecontractABI } from "../../constants";
function Data({ owner, CampaignAddress, title, date, goal, index ,deadline}) {
  let statusInLetters = "";
  const { contract } = useContract(CampaignAddress, BasecontractABI);
  const {
    data: status,
    isLoading,
    error,
  } = useContractRead(contract, "campaignStatus");
  const {
    data: totalContributions,
    isLoading: isLoadingTotalContributions,
    error: totalContributionsError,
  } = useContractRead(contract, "totalContributions");
  const statusMap = {
    0: "Active",
    1: "Successful",
    2: "Pending",
    3: "Failed",
    4: "Denied",
  };
  if (status !== undefined && statusMap.hasOwnProperty(status)) {
    statusInLetters = statusMap[status];
  }
  if (deadline <= 0 && totalContributions < goal) {
    statusInLetters=statusMap[3];
  }
  if (deadline <= 0 && totalContributions >= goal) {
    statusInLetters=statusMap[1];
  }
  return (
    <tr className={`data-row ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
      {owner && <td>{owner}</td>}
      <td>
        <a href="#">{title}</a>
      </td>
      <td>{date} </td>
      <td>{goal} ETH</td>
      {status !== undefined && <td>{statusInLetters}</td>}
    </tr>
  );
}
export default Data;
