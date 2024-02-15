const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaignFactory", function () {
    let CampaignFactory;
    let campaignFactory;
    let CharityBasedCampaign;
    let EquityBasedCampaign;
    let RewardBasedCampaign;
    let accounts;
    let user1 ;
    const MINIMUM_CONTRIBUTION = 100;
    const DURATION_IN_DAYS = 30;
    const GOAL = 1000;

    before(async function () {
        // Deploy the contracts
        CampaignFactory = await ethers.getContractFactory("CampaginFactory");
        CharityBasedCampaign = await ethers.getContractFactory("CharityBasedCampaign");
        EquityBasedCampaign = await ethers.getContractFactory("EquaityBasedCampaign");
        RewardBasedCampaign = await ethers.getContractFactory("RewardBasedCampaign");

        [accounts , user1] = await ethers.getSigners();
    });

    beforeEach(async function () {
        // Deploy a new CampaignFactory contract for each test
        campaignFactory = await CampaignFactory.deploy();
    });

    it("should create Charity Based Campaign", async function () {
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Charity campaign type
        );

        const deployedProjects = await campaignFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);

        const campaignAddress = deployedProjects[0];
        const campaign = await ethers.getContractAt("CharityBasedCampaign", campaignAddress);
        const owner = await campaign.Owner();
        expect(owner).to.equal(accounts.address);
    });

    
    it("should create Equity Based Campaign", async function () {
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            1 // Equity campaign type
        );

        const deployedProjects = await campaignFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);

        const campaignAddress = deployedProjects[0];
        const campaign = await ethers.getContractAt("EquaityBasedCampaign", campaignAddress);
        const owner = await campaign.Owner();
        expect(owner).to.equal(accounts.address);
    });

    it("should create Reward Based Campaign", async function () {
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            2 // Reward campaign type
        );

        const deployedProjects = await campaignFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);

        const campaignAddress = deployedProjects[0];
        const campaign = await ethers.getContractAt("RewardBasedCampaign", campaignAddress);
        const owner = await campaign.Owner();
        expect(owner).to.equal(accounts.address);
    });
    it("should allow any user to create projects", async function () {
        const [, user1] = await ethers.getSigners();
    
        await campaignFactory.connect(user1).createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Charity campaign type
        );
    
        const deployedProjects = await campaignFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);
    });
    it("should return deployed projects by user", async function () {
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Charity campaign type
        );
    
        const userDeployedProjects = await campaignFactory.getDeployedProjectsByUser(accounts.address);
        expect(userDeployedProjects.length).to.equal(1);
    });
    
    it("should emit CampaignCreated event when a project is created", async function () {
        const tx = await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Charity campaign type
        );
    
        await expect(tx)
            .to.emit(campaignFactory, "CampaignCreated")
            
    });
    
    it("should deploy a new instance of CharityBasedCampaign for Charity campaign type", async function () {
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Charity campaign type
        );
    
        const deployedProjects = await campaignFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);
    
        const campaignAddress = deployedProjects[0];
        const campaign = await ethers.getContractAt("CharityBasedCampaign", campaignAddress);
        expect(await campaign.minimumcontribution()).to.equal(MINIMUM_CONTRIBUTION);
    });
    
    it("should deploy a new instance of EquityBasedCampaign for Equity campaign type", async function () {
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            1 // Equity campaign type
        );
    
        const deployedProjects = await campaignFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);
    
        const campaignAddress = deployedProjects[0];
        const campaign = await ethers.getContractAt("EquaityBasedCampaign", campaignAddress);
        expect(await campaign.minimumcontribution()).to.equal(MINIMUM_CONTRIBUTION);
    });
    
    it("should deploy a new instance of RewardBasedCampaign for Reward campaign type", async function () {
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            2 // Reward campaign type
        );
    
        const deployedProjects = await campaignFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(1);
    
        const campaignAddress = deployedProjects[0];
        const campaign = await ethers.getContractAt("RewardBasedCampaign", campaignAddress);
        expect(await campaign.minimumcontribution()).to.equal(MINIMUM_CONTRIBUTION);
    });
    it("should return the correct deployed projects", async function () {
        // Create multiple projects
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Charity campaign type
        );
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            1 // Equity campaign type
        );
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            2 // Reward campaign type
        );
    
        const deployedProjects = await campaignFactory.getDeployedProjects();
        expect(deployedProjects.length).to.equal(3);
    });
    
    it("should return the correct deployed projects by user", async function () {
        // Create projects by different users
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Charity campaign type
        );
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            1 // Equity campaign type
        );
    
        const [, user1, user2] = await ethers.getSigners();
    
        await campaignFactory.connect(user1).createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            2 // Reward campaign type
        );
    
        await campaignFactory.connect(user2).createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Charity campaign type
        );
    
        const user1Projects = await campaignFactory.getDeployedProjectsByUser(user1.address);
        expect(user1Projects.length).to.equal(1);
            const userP = await ethers.getContractAt("RewardBasedCampaign",user1Projects[0]);
            expect(await userP.Owner()).to.equal(user1.address);
        const user2Projects = await campaignFactory.getDeployedProjectsByUser(user2.address);
        expect(user2Projects.length).to.equal(1);
    });
    
    it("should The campaign status should be pending after creation", async function () {

        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
           0 // Reward campaign type
        );
        const deployedProjects = await campaignFactory.getDeployedProjects();
        const campaign = await ethers.getContractAt("CharityBasedCampaign", deployedProjects[0]);
        expect(await campaign.campaignStatus()).to.equal(2);
    });
    it("should Admin should be able to change the campaign status", async function () {
        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
           0 // Reward campaign type
        );
        const deployedProjects = await campaignFactory.getDeployedProjects();
        const campaign = await ethers.getContractAt("CharityBasedCampaign", deployedProjects[0]);
        await campaign.setCampaignActive();
        expect(await campaign.campaignStatus()).to.equal(0);
    });
    it("should revert when non-admin tries to change the campaign status", async function () {

        await campaignFactory.createProject(
            MINIMUM_CONTRIBUTION,
            DURATION_IN_DAYS,
            GOAL,
            0 // Reward campaign type
        );
        const deployedProjects = await campaignFactory.getDeployedProjects();
        const campaign = await ethers.getContractAt("CharityBasedCampaign", deployedProjects[0]);
    
        // Get the signer for user1's address
        const user1Signer = await ethers.provider.getSigner(user1.address);
    
        // Connect to the campaign contract with user1's signer
        const user1Campaign = await campaign.connect(user1Signer);
        // Try to set campaign as active and expect it to revert
        expect( user1Campaign.setCampaignActive()).to.be.revertedWith("Only the admin can set the campaign status");
    });
    
});