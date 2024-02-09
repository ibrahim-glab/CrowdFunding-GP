// SPDX-License-Identifier: GPL-3.0
import "hardhat/console.sol";
pragma solidity >=0.7.0 <0.9.0;
contract Admin{
    address immutable  adminAddress;
    constructor(address _adminAddress){
        adminAddress = _adminAddress;
        console.log(adminAddress);

    }
}