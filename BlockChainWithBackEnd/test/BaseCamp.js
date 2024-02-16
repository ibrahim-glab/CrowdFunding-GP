const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaginFactory", function () {
    let CampaginFactory;
    let campaginFactory;
    let CharityBasedCampaign;
    let EquaityBasedCampaign;
    let RewardBasedCampaign;
    let BaseCampaign;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        CampaginFactory = await ethers.getContractFactory("CampaginFactory");
        campaginFactory = await CampaginFactory.deploy();

        CharityBasedCampaign = await ethers.getContractFactory("CharityBasedCampaign");
        EquaityBasedCampaign = await ethers.getContractFactory("EquaityBasedCampaign");
        RewardBasedCampaign = await ethers.getContractFactory("RewardBasedCampaign");
        BaseCampaign = await ethers.getContractFactory("BaseCampaign");
    });

    it("Should set the admin correctly", async function () {
        expect(await campaginFactory.admin()).to.equal(owner.address);
    });

    it("Should create a Charity-based campaign", async function () {
        await campaginFactory.createProject(100, 30, 1000, 0, true);
        const deployedProjects = await campaginFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);
    });

    it("Should create an Equity-based campaign", async function () {
        await campaginFactory.createProject(100, 30, 1000, 1, true);
        const deployedProjects = await campaginFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);
    });

    it("Should create a Reward-based campaign", async function () {
        await campaginFactory.createProject(100, 30, 1000, 2, true);
        const deployedProjects = await campaginFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);
    });
    it("Should allow retrieval of deployed projects", async function () {
      await campaginFactory.createProject(100, 30, 1000, 0, true);
      await campaginFactory.createProject(100, 30, 1000, 1, true);
      await campaginFactory.createProject(100, 30, 1000, 2, true);
      const deployedProjects = await campaginFactory.getDeployedProjects();
      expect(deployedProjects.length).to.equal(3);
  });

  it("Should create a Charity-based campaign ensure event is emitted", async function () {

    expect(await campaginFactory.createProject(100, 30, 1000, 0, true)).to.emit(campaginFactory, "CampaignCreated");
});

it("Should create an Equity-based campaign ensure event is emitted", async function () {
   

    expect(await campaginFactory.createProject(100, 30, 1000, 1, true)).to.emit(campaginFactory, "CampaignCreated");
});

it("Should create a Reward-based campaign ensure event is emitted", async function () 
{
    expect(await campaginFactory.createProject(100, 30, 1000, 2, true)).to.emit(campaginFactory, "CampaignCreated");
});
 // Test case for contributing to a project
 it("Should contribute to a project", async function () {
    await campaginFactory.createProject(100, 30, 1000, 0, true);
    const projects = await campaginFactory.getDeployedProjects();
    await campaginFactory.Contribute(await ethers.ContractAt("CharityBasedCampaign", projects[0]) , 100, "hello");
    const contributions = await campaginFactory.getContributions(owner.address);
    console.log(contributions);
    expect(contributions.length).to.equal(1);
});    

});
