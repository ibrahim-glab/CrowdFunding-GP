// SPDX-License-Identifier: GPL-3.0
import "./CharityBasedCampaign.sol";
import "./EquaityBasedCampaign.sol";
import "./RewardBasedCampaign.sol";
import "./BaseCampaign.sol";
import "./UserManagement.sol";
import "hardhat/console.sol";
pragma solidity >=0.7.0 <0.9.0;

contract CampaginFactory {
    BaseCampaign[] public deployedProjects;
    enum CampaignType {
        Charity,
        Equaity,
        Reward
    }

    function createProject(
        uint256 minimumContribution,
        uint256 durationInDays,
        uint256 Goal,
        CampaignType campType
    ) public {
        if(campType == CampaignType.Charity){
            console.log("Reward 1 ");
             BaseCampaign newCamp = new CharityBasedCampaign(
            payable(msg.sender),
            minimumContribution,durationInDays , Goal);
            deployedProjects.push(newCamp);
        }
        else if(campType == CampaignType.Equaity){
             console.log("Reward 2 ");

            BaseCampaign newCamp = new EquaityBasedCampaign(
             payable(msg.sender),
            minimumContribution,durationInDays , Goal);
            deployedProjects.push(newCamp);
            console.log("Reward 2 out out " );
        }
        else if(campType == CampaignType.Reward){
            console.log("Reward");
            BaseCampaign newCamp = new RewardBasedCampaign(
             payable(msg.sender),
            minimumContribution,durationInDays , Goal);
            deployedProjects.push(newCamp);
        }
    console.log("Reward out");

    
    }

    function getDeployedProjects() public view returns (BaseCampaign[] memory) {
        return deployedProjects;
    }
}
