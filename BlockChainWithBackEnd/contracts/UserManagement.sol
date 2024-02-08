// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CampaginFactory.sol";
import "./BaseCampaign.sol";
contract UserManagement {
    // Struct to represent user data
    User private governor;
    struct User {
        address ethAddress;
        bool registered;
      
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed userAddress);
    constructor() {
         governor = User({
            ethAddress: msg.sender,
            registered: true
        });
    }
    modifier onlyGovernor() {
        require(msg.sender == governor.ethAddress, "Unauthorized");
        _;
    }
    function registerUser() public {
        require(!users[msg.sender].registered, "User already registered");

        users[msg.sender] = User({
            ethAddress: msg.sender,
            registered: true
        });

        emit UserRegistered(msg.sender);
    }
}