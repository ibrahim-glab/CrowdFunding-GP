// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function main() {
  
  const CampignFactory = await hre.ethers.getContractFactory("CampaginFactory");
  const Contract = await CampignFactory.deploy();

  const add = await Contract.getAddress();
  console.log("CampaginFactory deployed to:", add);
  await Contract.createProject(2,10,100000000000,1); 
  // const fun = await Contract.getFunction("deployedProjects");
  // const re = fun.staticCallResult();
  const List = await Contract.getDeployedProjects();
  const co = await hre.ethers.getContractAt("BaseCampaign",List[0]);
  console.log("List",List);
  console.log("List",List.length);
  console.log("List", await co.Owner());

  const flage = await co.isCampaignActive();
  console.log("flage", flage);
  await co.setCampaignActive();

  console.log("Contribution", await co.minimumcontribution());

  await co.contribute({value: hre.ethers.parseUnits("2300.0") });
  console.log("Contribution", await co.totalContributions());
  console.log("Goal", await co.goal());
  try {
    await co.contribute({value: hre.ethers.parseUnits("2300.0") });

    
  } catch (error) {
    console.log(error);
  }
  console.log("Contribution", await co.totalContributions());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
