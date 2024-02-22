// SPDX-License-Identifier: GPL-3.0
import "./BaseCampaign.sol";

pragma solidity >=0.7.0 <0.9.0;

contract RewardBasedCampaign is BaseCampaign {
    constructor(
        address payable owner,
        string memory title,
        string memory description,
        string memory image,
        uint256 durationInDays,
        uint256 Goal,
        address admin,
        bool verfied
    )
        BaseCampaign(
            owner,
            title,
            description,
            image,
            durationInDays,
            Goal,
            admin,
            verfied
        )
    {}
}
