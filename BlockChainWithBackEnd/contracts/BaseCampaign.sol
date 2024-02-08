// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract BaseCampaign {
    address public Owner;
    uint256 public minimumcontribution;
    uint256 public goal;
    mapping(address => uint256) public contributors;
    address[] public contributorsList;
    uint256 public totalContributions;
    uint256 public campaignEndTime;
    bool private authorized ; 
    enum CampaignStatus {
        Active,
        Successful,
        Pending,
        Failed
    }
    CampaignStatus public campaignStatus;
    event ContributionReceived(
        address indexed contributor,
        uint256 amount,
        string message
    );
    // struct Request {
    //     string description;
    //     uint256 value;
    //     address payable recipient;
    //     bool complete;
    //     uint256 approvalCount;
    // }
    // Request[] public requests;

    constructor(
        address owner,
        uint256 minimumContribution,
        uint256 durationInDays,
        uint256 Goal
    ) {
        Owner = owner;
        minimumcontribution = minimumContribution;
        campaignEndTime = block.timestamp + (durationInDays * 1 days);
        campaignStatus = CampaignStatus.Pending;
        goal = Goal;
    }

    modifier restricted() {
        require(msg.sender == Owner, "Only the Owner can call this function");
        _;
    }

    function isCampaignActive() public view returns (bool) {
        if (campaignStatus == CampaignStatus.Active) {
            return true;
        }
        return false;
    }

    function contribute(string memory message) public payable {
        require(block.timestamp < campaignEndTime, "Campaign has ended");
        require(campaignStatus == CampaignStatus.Active , "Campaign is Not active");
        require(
            msg.value >= minimumcontribution,
            "Contribution amount too low"
        );

        contributors[msg.sender] += msg.value;
        totalContributions += msg.value;
        contributorsList.push(msg.sender);
        emit ContributionReceived(msg.sender, msg.value, message);
    }

    // function createRequest(
    //     string memory description,
    //     uint256 value,
    //     address payable recipient
    // ) public restricted {
    //     Request memory newRequest = Request({
    //         description: description,
    //         value: value,
    //         recipient: recipient,
    //         complete: false,
    //         approvalCount: 0
    //     });
    //     requests.push(newRequest);
    // }

    //   function approveRequest(uint256 index) public {
    //     Request storage request = requests[index];
    //     require(contributors[msg.sender] > 0, "You must be a contributor to approve");
    //     require(!request.approvals[msg.sender], "You can't approve the same request twice");

    //     request.approvals[msg.sender] = true;
    //     request.approvalCount++;
    // }

    function endCampaign() public restricted {
        require(
            block.timestamp >= campaignEndTime,
            "Campaign has not ended yet"
        );
        if (totalContributions < goal) {
            campaignStatus = CampaignStatus.Failed;
            refundContributors();
        } else if (totalContributions >= goal) {
            campaignStatus = CampaignStatus.Successful;
        }
    }

    function refundContributors() public {
        for (uint256 i = 0; i < contributorsList.length; i++) {
            payable(contributorsList[i]).transfer(
                contributors[contributorsList[i]]
            );
        }
    }
}
