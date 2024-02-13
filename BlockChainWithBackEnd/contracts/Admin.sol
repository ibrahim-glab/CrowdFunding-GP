// SPDX-License-Identifier: GPL-3.0
import "hardhat/console.sol";
pragma solidity >=0.7.0 <0.9.0;

// Import the BaseCampaign contract
import "./BaseCampaign.sol";

contract Admin {
    address immutable adminAddress;

    constructor(address _adminAddress) {
        adminAddress = _adminAddress;
        console.log(adminAddress);
    }

    function SetCampaignActive(address campaign) public {
       BaseCampaign(campaign).setCampaignStatus(BaseCampaign.CampaignStatus.Active);
    }

    function SetCampaignFailed(address campaign) public {
        BaseCampaign(campaign).setCampaignStatus(BaseCampaign.CampaignStatus.Failed);
    }
}
