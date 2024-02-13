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
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);
    event CampaignActivated(
        address indexed admin,
        address indexed campaign,
        bool isActive
    );
    event CampaignCreated(address indexed Owner, address indexed campaign);

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
        if (campType == CampaignType.Charity) {
            console.log("Reward 1 ");
            BaseCampaign newCamp = new CharityBasedCampaign(
                payable(msg.sender),
                minimumContribution,
                durationInDays,
                Goal,
                admin
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
                admin
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
                admin
            );
            deployedProjects.push(newCamp);
            userCampagins[msg.sender].push(newCamp);
            emit CampaignCreated(msg.sender, address(newCamp));
        }
        console.log("Reward out");
    }

    function getDeployedProjects() public view returns (BaseCampaign[] memory) {
        return deployedProjects;
    }
    function getDeployedProjectsByUser(address user) public view returns (BaseCampaign[] memory) {
        return userCampagins[user];
    }
}
