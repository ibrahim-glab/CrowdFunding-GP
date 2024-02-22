
// SPDX-License-Identifier: GPL-3.0
import "./BaseCampaign.sol";

pragma solidity >=0.7.0 <0.9.0;
contract EquaityBasedCampaign is BaseCampaign{

    uint256 totaldonations = 0;

    constructor(
        address payable owner,
        string memory ownerName,
         string memory title,
        string memory description,
        string memory image,
        uint256 durationInDays,
        uint256 Goal , 
        address admin,
        bool verfied
    ) BaseCampaign(owner, ownerName , title,description , image, durationInDays, Goal , admin , verfied) {}


    function contribute( address sender) public payable override   CampaignActice
        ContributionMinimun  {
        require(block.timestamp < campaignEndTime, "Campaign has ended");
        require(
            campaignStatus == CampaignStatus.Active,
            "Campaign is Not active"
        );

     
         require(
            totalContributions <  goal,
            "The campaign reaches its goal"
        );
        contributors[sender] += msg.value;
        totalContributions += msg.value;
        contributorsList.push(sender);
    }
}
