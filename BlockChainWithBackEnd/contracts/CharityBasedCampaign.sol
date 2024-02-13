// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./BaseCampaign.sol";

contract CharityBasedCampaign is BaseCampaign {
    constructor(
        address payable owner,
        uint256 minimumContribution,
        uint256 durationInDays,
        uint256 Goal , 
        address admin
    ) BaseCampaign(owner, minimumContribution, durationInDays, Goal , admin) {}

    function endCampaign() public override restricted {
        require(
            block.timestamp >= campaignEndTime,
            "Campaign has not ended yet"
        );
        require(address(this).balance > 0, "Contract balance is empty");
        bool send = SendBalance();
        require(send, "Failed to send balance to" );
    }
}
