// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract BaseCampaign {
 
    address payable public Owner;
  
    address private Admin;
    uint256 public immutable goal;
    mapping(address => uint256) public contributors;
    address[] public contributorsList;
    uint256 public totalContributions;
    uint256 public immutable campaignEndTime;
    enum CampaignStatus {
        Active,
        Successful,
        Pending,
        Failed,
        Denied
    }
    CampaignStatus public campaignStatus;
    event ContributionReceived(address indexed contributor, address Campaign ,uint256 amount , uint256 date );
    constructor(
        address payable owner,
        uint256 durationInDays,
        uint256 Goal,
        address admin,
        bool verfied
    ) {
        Owner = owner;
        campaignEndTime = block.timestamp + (durationInDays * 1 days);
        if (!verfied) campaignStatus = CampaignStatus.Active;
        else{
        campaignStatus = CampaignStatus.Pending;}
        goal = Goal;
        Admin = admin;    
    }

    modifier restricted() {
        require(msg.sender == Owner, "Only the Owner can call this function");
        _;
    }

    modifier OnlyAdmin() {
        require(msg.sender == Admin, "Only the Admin can call this function");
        _;
    }
    function setCampaignActive() public OnlyAdmin {

        campaignStatus = CampaignStatus.Active;
    }

    function setCampaignDenied() external  OnlyAdmin {
       campaignStatus = CampaignStatus.Denied;    
    }


    function contribute( address sender)     
         public     
         payable       
         virtual
              
    {
        require(block.timestamp < campaignEndTime, "Campaign has ended");
      
        contributors[sender] += msg.value;
        totalContributions += msg.value;
        contributorsList.push(sender);
        emit ContributionReceived(sender, address(this) , msg.value , block.timestamp);
    }

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

    function refundContributors() internal {
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
