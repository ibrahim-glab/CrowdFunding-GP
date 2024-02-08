// SPDX-License-Identifier: GPL-3.0
import "./CharityBasedCampaign.sol";
import "./EquaityBasedCampaign.sol";
import "./rewardBasedCampaign.sol";
import "./BaseCampaign.sol";
import "./UserManagement.sol";
pragma solidity >=0.7.0 <0.9.0;

contract CapmpaginFactory {
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
             BaseCampaign newCamp = new CharityBasedCampaign(
            msg.sender,
            minimumContribution,durationInDays , Goal);
            deployedProjects.push(newCamp);
        }
        else if(campType == CampaignType.Equaity){
            BaseCampaign newCamp = new EquaityBasedCampaign(
            msg.sender,
            minimumContribution,durationInDays , Goal);
            deployedProjects.push(newCamp);
        }
        else if(campType == CampaignType.Reward){
            BaseCampaign newCamp = new RewardBasedCampaign(
            msg.sender,
            minimumContribution,durationInDays , Goal);
            deployedProjects.push(newCamp);
        }
       
    
    }

    function getDeployedProjects() public view returns (BaseCampaign[] memory) {
        return deployedProjects;
    }
}
