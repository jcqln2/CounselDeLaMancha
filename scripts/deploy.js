const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const CounselDeLaMancha = await hre.ethers.getContractFactory("CounselDeLaMancha");
  // Deploy the contract
  const oracle = await CounselDeLaMancha.deploy();
  // Wait for the contract to be mined
  await oracle.waitForDeployment();
  // Log the contract address
  console.log("CounselDeLaMancha deployed to:", oracle.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
