// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract Campagin{
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public contributors;
    mapping(address => bool) public approvals;
    uint256 public contributorsCount;
    event NewRequest(uint256 index, string description, uint256 value, address recipient);
    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    // Constructor
    constructor(uint256 minContribution, address creator) {
        manager = creator;
        minimumContribution = minContribution;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution, "Contribution amount too low");
        contributors[msg.sender] = true;
        contributorsCount++;
    }
    function createRequest(string memory desc, uint256 val, address payable rec) public {
        Request memory newRequest = Request({
            description: desc, 
            value: val,  
            recipient: rec,  
            complete: false,   
            approvalCount: 0
        });
        requests.push(newRequest);
        emit NewRequest(requests.length - 1, desc, val, rec);
    }
       
   

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(contributors[msg.sender], "You must be a contributor to approve");
        require(!approvals[msg.sender], "You can't approve the same request twice");

        approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];

        require(!request.complete, "Request already completed");
        require(request.approvalCount > (contributorsCount / 2), "Insufficient approvals");

        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
}

