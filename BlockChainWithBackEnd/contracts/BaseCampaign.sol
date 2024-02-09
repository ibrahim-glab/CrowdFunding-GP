// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
contract BaseCampaign {
    address payable public Owner;
    uint256 public Type;
    uint256 public minimumcontribution;
    uint256 public immutable goal;
    mapping(address => uint256) public contributors;
    address[] public contributorsList;
    uint256 public totalContributions;
    uint256 public immutable campaignEndTime;
    bool private authorized;
    enum CampaignStatus {
        Active,
        Successful,
        Pending,
        Failed
    }
    CampaignStatus public campaignStatus;
    event ContributionReceived(
        address indexed contributor,
        uint256 amount
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
        address  payable owner,
        uint256 minimumContribution,
        uint256 durationInDays,
        uint256 Goal
    ) {
        Owner = owner;
        minimumcontribution = minimumContribution;
        campaignEndTime = block.timestamp + (durationInDays * 1 days);
        campaignStatus = CampaignStatus.Pending;
        goal = Goal;
        console.log(address(this));
    }

    modifier restricted() {
        require(msg.sender == Owner, "Only the Owner can call this function");
        _;
    }
     modifier CampaignActice(){
        require(campaignStatus == CampaignStatus.Active, "Campaign is not active");
        _;
     }
     modifier ContributionMinimun(){
        require(msg.value >= minimumcontribution, "Contribution amount too low");
        _;
     }
    function isCampaignActive() public view returns (bool) {
        if (campaignStatus == CampaignStatus.Active) {
            return true;
        }
        return false;
    }
    function setCampaignActive() public restricted   {
        campaignStatus = CampaignStatus.Active;
       }
    
        //update this fun to
    function contribute() public virtual payable  CampaignActice ContributionMinimun {
        require(block.timestamp < campaignEndTime, "Campaign has ended");     
        require(
            msg.value>= minimumcontribution,
            "Contribution amount too low"
        );

        contributors[msg.sender] += msg.value;
        totalContributions += msg.value;
        contributorsList.push(msg.sender);
        emit ContributionReceived(msg.sender, msg.value);
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

    function endCampaign() public virtual restricted {
        require(
            block.timestamp >= campaignEndTime,
            "Campaign has not ended yet"
        );
        require(address(this).balance > 0, "Contract balance is empty");

        if (totalContributions < goal) {
            campaignStatus = CampaignStatus.Failed;
            refundContributors();
        } else if (totalContributions >= goal) {
            campaignStatus = CampaignStatus.Successful;
            bool send = SendBalance();
            require(
                send,
                "Failed to send The campaign balance to the Owner, please try again later"
            );
        }
    }

    function refundContributors() public {
        uint256 maxRetries = 5;
        for (uint256 i = 0; i < contributorsList.length; i++) {
            uint256 retries = 0;
            bool send;
            do {
                send = payable(contributorsList[i]).send(
                    contributors[contributorsList[i]]
                );
                retries++;
            } while (!send && retries < maxRetries);

            require(
                send,
                "Failed to send the contribution to the contributor after multiple attempts. Please try again later."
            );
            contributors[contributorsList[i]] = 0;
        }
    }

    function SendBalance() internal virtual returns (bool) {
        return payable(Owner).send(address(this).balance);
    }
}
