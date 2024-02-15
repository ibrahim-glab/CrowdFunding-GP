// SPDX-License-Identifier: GPL-3.0
import "./CharityBasedCampaign.sol";
import "./EquaityBasedCampaign.sol";
import "./RewardBasedCampaign.sol";
import "./BaseCampaign.sol";
import "./UserManagement.sol";
import "hardhat/console.sol";
pragma solidity >=0.7.0 <0.9.0;

contract CampaginFactory {
    address public immutable admin;
    
    event CampaignCreated(address indexed Owner, address indexed campaign);
     struct Contribution {
        address campaignAddress;
        uint256 amount;
    }
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    BaseCampaign[] public deployedProjects;
    mapping(address => BaseCampaign) public campagins;
    mapping(address => BaseCampaign[]) public userCampagins;
    mapping(address => Contribution[]) public userContributions;


    enum CampaignType {
        Charity,
        Equaity,
        Reward
    }

    function createProject(
        uint256 minimumContribution,
        uint256 durationInDays,
        uint256 Goal,
        CampaignType campType,
        bool verfied

    ) public {
        if (campType == CampaignType.Charity) {
            console.log("Reward 1 ");
            BaseCampaign newCamp = new CharityBasedCampaign(
                payable(msg.sender),
                minimumContribution,
                durationInDays,
                Goal,
                admin , verfied
            );
            deployedProjects.push(newCamp);
            userCampagins[msg.sender].push(newCamp);
            emit CampaignCreated(msg.sender, address(newCamp));
        } else if (campType == CampaignType.Equaity) {
            console.log("Reward 2 ");
            BaseCampaign newCamp = new EquaityBasedCampaign(
                payable(msg.sender),
                minimumContribution,
                durationInDays,
                Goal,
                admin , verfied
            );
            deployedProjects.push(newCamp);
            userCampagins[msg.sender].push(newCamp);

            emit CampaignCreated(msg.sender, address(newCamp));
        } else if (campType == CampaignType.Reward) {
            console.log("Reward");
            BaseCampaign newCamp = new RewardBasedCampaign(
                payable(msg.sender),
                minimumContribution,
                durationInDays,
                Goal,
                admin , verfied
            );
            deployedProjects.push(newCamp);
            userCampagins[msg.sender].push(newCamp);
            emit CampaignCreated(msg.sender, address(newCamp));
        }
        console.log("Reward out");
    }


     function contribute(address _campaignAddress, uint256 _amount) public payable {
        BaseCampaign campaign = BaseCampaign(_campaignAddress);
        campaign.contribute{value: msg.value}();
        userContributions[msg.sender].push(Contribution(_campaignAddress, _amount));
    }

    function getDeployedProjects() public view returns (BaseCampaign[] memory) {
        return deployedProjects;
    }
    function getDeployedProjectsByUser(address user) public view returns (BaseCampaign[] memory) {
        return userCampagins[user];
    }
    function getUserContributions(address _user) public view returns (Contribution[] memory) {
        return userContributions[_user];
    }
}
