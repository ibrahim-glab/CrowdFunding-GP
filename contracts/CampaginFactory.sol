// SPDX-License-Identifier: GPL-3.0
import "contracts/Campagin.sol";

pragma solidity >=0.7.0 <0.9.0;
contract CapmpaginFactory{
address[] public deployedProjects;

    function createProject(uint256 minimumContribution) public {
        address newProject = address(new Campagin(minimumContribution , msg.sender));
        deployedProjects.push(newProject);
    }

    function getDeployedProjects() public view returns (address[] memory) {
        return deployedProjects;
    }
}