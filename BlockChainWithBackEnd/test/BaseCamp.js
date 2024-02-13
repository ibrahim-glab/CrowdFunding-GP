const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaignFactory", function () {
  let CampaignFactory;
  let campaignFactory;
  let admin;
  let user;

  beforeEach(async function () {
    [admin, user] = await ethers.getSigners();
    CampaignFactory = await ethers.getContractFactory("CampaginFactory");
    campaignFactory = await CampaignFactory.deploy(admin);
  });


  it("should allow admin to create campaigns", async function () {
    await expect(campaignFactory.createProject(10, 8, ethers.parseEther("30"), 1))
      .to.emit(campaignFactory, "CampaignCreated")
  });
});

describe("BaseCampaign", function () {
  let CampaginFactory;
  let campaginFactory;
  let baseCampaign;
  let admin;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    CampaginFactory = await ethers.getContractFactory("CampaginFactory");
    [owner, admin, addr1, addr2, ...addrs] = await ethers.getSigners();

    campaginFactory = await CampaginFactory.deploy({
      admin
    }
    );
    campaginFactory = await campaginFactory.connect(owner);
    await campaginFactory.createProject(10, 8, ethers.parseEther("30"), 1)
    const baseCampaigns = await campaginFactory.getDeployedProjects();
    baseCampaign = await ethers.getContractAt(baseCampaigns[0]);

  });

  it("should allow user to create campaigns", async function () {
    await expect(baseCampaign.Owner()).to.equal(owner)
  });
  it("Should set the right owner", async function () {
    expect(await baseCampaign.Owner()).to.equal(owner);
  });
  it("Should set the Goal", async function () {
    expect(await baseCampaign.goal()).to.equal(ethers.parseEther("10"));
  });

  it("Should set the right minimum contribution", async function () {
    expect(await baseCampaign.minimumcontribution()).to.equal(10);
  });

  it("Should set the right campaign end time", async function () {
    const currentTime = await ethers.provider.getBlock();
    const currentTimestamp = currentTime.timestamp;
    const campaignEndTime = await baseCampaign.campaignEndTime();
    expect(campaignEndTime).to.equal(currentTimestamp + 7 * 24 * 60 * 60);
  });

  it("Should allow contribution when campaign is active", async function () {
    await baseCampaign.setCampaignActive();
    await expect(() => baseCampaign.contribute({ value: ethers.parseEther("200") })).to.changeEtherBalance(baseCampaign, ethers.parseEther("200"));
  });

  it("Should not allow contribution when campaign is not active", async function () {
    await expect(baseCampaign.contribute({ value: ethers.parseEther("200") })).to.be.revertedWith("Campaign is not active");
  });

  it("Should end campaign successfully if goal is reached", async function () {
    await baseCampaign.setCampaignActive();
    await baseCampaign.contribute({ value: ethers.parseEther("10") }); // Contribute 10 ether (reaches the goal)
    await ethers.provider.send("evm_increaseTime", [8 * 24 * 60 * 60]); // Fast-forward 8 days
    await baseCampaign.endCampaign();
    expect(await baseCampaign.campaignStatus()).to.equal(1); // Check if campaign status is Successful
  });
  // it("Should refund contributors if campaign fails", async function () {
  //   await baseCampaign.setCampaignActive();
  //   const contributorBalanceBeforeContribution = await ethers.provider.getBalance(addr1.address);
  //   const contributionAmount = ethers.parseEther("5");
  //   const gasLimit = 3000000; // Adjust gas limit as needed

  //   // Make the contribution and get the transaction receipt
  //   const tx = await baseCampaign.connect(addr1).contribute({ value: contributionAmount, gasLimit: gasLimit });
  //   const receipt = await tx.wait();

  //   // Calculate the transaction cost (gas fees)
  //   const gasUsed = receipt.gasUsed;
  //   const gasPrice = receipt.effectiveGasPrice;

  //   const transactionCost = gasUsed.mul(gasPrice);

  //   // Calculate the expected balance after the contributionn
  //   const expectedBalanceAfterContribution = contributorBalanceBeforeContribution.sub(contributionAmount).sub(transactionCost);

  //   // Record the contract balance before ending the campaign
  //   const contractBalanceBeforeEnd = await ethers.provider.getBalance(baseCampaign.address);

  //   // Fast-forward 8 days
  //   await ethers.provider.send("evm_increaseTime", [8 * 24 * 60 * 60]);

  //   // End the campaign
  //   await baseCampaign.endCampaign();

  //   // Check if campaign status is Failed
  //   expect(await baseCampaign.campaignStatus()).to.equal(3);

  //   // Check the contributor's balance after the campaign ends
  //   const contributorBalanceAfterEnd = await ethers.provider.getBalance(addr1.address);
  //   expect(contributorBalanceAfterEnd).to.equal(expectedBalanceAfterContribution);

  //   // Check if contract balance remains unchanged
  //   const contractBalanceAfterEnd = await ethers.provider.getBalance(baseCampaign.address);
  //   expect(contractBalanceAfterEnd).to.equal(contractBalanceBeforeEnd);
  // });


  // Add more test cases for other functions as needed
});
