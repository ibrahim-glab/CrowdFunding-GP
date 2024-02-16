// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./CharityBasedCampaign.sol";
import "./EquaityBasedCampaign.sol";
import "./RewardBasedCampaign.sol";
import "./BaseCampaign.sol";
import "hardhat/console.sol";

contract CampaginFactory {
    struct Contribution {
        uint256 amount;
        address Campaignaddress;
    }
    address public immutable admin;
    BaseCampaign[] private deployedProjects;
    mapping (address=>BaseCampaign[]) private UserCampaigns;
    event CampaignCreated(address indexed Owner, address indexed campaign);

    constructor() {
        admin = msg.sender;
    }
    mapping(address => Contribution[]) private contributions;
    enum CampaignType { Charity, Equaity, Reward }

    function createProject(
        uint256 minimumContribution,
        uint256 durationInDays,
        uint256 goal,
        CampaignType campType,
        bool verified
    ) public {
        BaseCampaign newCamp;
        if (campType == CampaignType.Charity) {
            newCamp = new CharityBasedCampaign(payable(msg.sender), minimumContribution, durationInDays, goal, admin, verified);
        } else if (campType == CampaignType.Equaity) {
            newCamp = new EquaityBasedCampaign(payable(msg.sender), minimumContribution, durationInDays, goal, admin, verified);
        } else if (campType == CampaignType.Reward) {
            newCamp = new RewardBasedCampaign(payable(msg.sender), minimumContribution, durationInDays, goal, admin, verified);
        }
        deployedProjects.push(newCamp);
        UserCampaigns[msg.sender].push(newCamp);
        emit CampaignCreated(msg.sender, address(newCamp));
    }
    function Contribute(address campaign) public payable {
        BaseCampaign camp = BaseCampaign(campaign);
        payable(address(camp)).transfer(msg.value);        
        contributions[msg.sender].push(Contribution({amount: msg.value, Campaignaddress: campaign}));
    }
    function getDeployedProjects() public view returns (BaseCampaign[] memory) {
        return deployedProjects;
    }
    function deployedProjectsByUser(address user) public view returns (BaseCampaign[] memory) {
        return UserCampaigns[user];
    }
    function getContributions(address user) public view returns (Contribution[] memory) {
        return contributions[user];
    }
}
