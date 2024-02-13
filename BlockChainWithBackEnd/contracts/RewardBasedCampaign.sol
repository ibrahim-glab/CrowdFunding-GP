
// SPDX-License-Identifier: GPL-3.0
import "./BaseCampaign.sol";

pragma solidity >=0.7.0 <0.9.0;
contract RewardBasedCampaign is BaseCampaign{
    constructor(address payable owner, uint256 minimumContribution, uint256 durationInDays , uint256 Goal , address admin) BaseCampaign(owner, minimumContribution, durationInDays , Goal , admin) {
    }
}
