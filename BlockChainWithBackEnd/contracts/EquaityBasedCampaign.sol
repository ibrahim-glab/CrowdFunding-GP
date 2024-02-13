
// SPDX-License-Identifier: GPL-3.0
import "./BaseCampaign.sol";

pragma solidity >=0.7.0 <0.9.0;
contract EquaityBasedCampaign is BaseCampaign{

    uint256 totaldonations = 0;

    constructor(address payable owner, uint256 minimumContribution, uint256 durationInDays , uint256 Goal , address admin) BaseCampaign(owner, minimumContribution, durationInDays , Goal , admin) {
    }

    function contribute() public payable override  {
        require(block.timestamp < campaignEndTime, "Campaign has ended");
        require(
            campaignStatus == CampaignStatus.Active,
            "Campaign is Not active"
        );

        require(
            msg.value >=minimumcontribution,
            "Contribution amount too low"
        );

         require(
            totalContributions <  goal,
            "The campaign reaches its goal"
        );

        contributors[msg.sender] += msg.value;
        totalContributions += msg.value;
        contributorsList.push(msg.sender);
    }
}
