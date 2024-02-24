// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./CharityBasedCampaign.sol";
import "./EquaityBasedCampaign.sol";
import "./BaseCampaign.sol";

contract CampaignFactory {
    address public immutable admin;
    BaseCampaign[] private deployedProjects;
    event CampaignCreated(address indexed owner, address indexed campaign);

    constructor() {
        admin = msg.sender;
    }
    enum CampaignType {
        Charity,
        Equaity,
        Reward
    }

    function createProject(
        string memory title,
        string memory description,
        string memory image,
        uint256 durationInDays,
        uint256 goal,
        CampaignType campType,
        bool verified
    ) external {
        BaseCampaign newCamp;
        if (campType == CampaignType.Charity) {
            newCamp = new CharityBasedCampaign(
                payable(msg.sender),
                title,
                description,
                image,
                durationInDays,
                goal,
                admin,
                verified
            );
        } else if (campType == CampaignType.Equaity) {
            newCamp = new EquaityBasedCampaign(
                payable(msg.sender),
                title,
                description,
                image,
                durationInDays,
                goal,
                admin,
                verified
            );
        } else if (campType == CampaignType.Reward) {
            newCamp = new BaseCampaign(
                payable(msg.sender),
                title,
                description,
                image,
                durationInDays,
                goal,
                admin,
                verified
            );
        }
        deployedProjects.push(newCamp);
        emit CampaignCreated(msg.sender, address(newCamp));
    }

    function contribute(address campaign) external payable {
        BaseCampaign camp = BaseCampaign(campaign);
        camp.contribute{value: msg.value}(msg.sender);
    }

    function getDeployedProjects()
        external
        view
        returns (BaseCampaign[] memory)
    {
        return deployedProjects;
    }
}
