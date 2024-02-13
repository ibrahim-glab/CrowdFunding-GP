const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaignFactory", function () {
    let CampaignFactory;
    let campaignFactory;
    let CharityBasedCampaign;
    let EquityBasedCampaign;
    let RewardBasedCampaign;
    let accounts;
    const MINIMUM_CONTRIBUTION = 100;
    const DURATION_IN_DAYS = 30;
    const GOAL = 1000;

    before(async function () {
        // Deploy the contracts
        CampaignFactory = await ethers.getContractFactory("CampaginFactory");
        CharityBasedCampaign = await ethers.getContractFactory("CharityBasedCampaign");
        EquityBasedCampaign = await ethers.getContractFactory("EquaityBasedCampaign");
        RewardBasedCampaign = await ethers.getContractFactory("RewardBasedCampaign");

        [accounts] = await ethers.getSigners();
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
        
});