const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy Mock Stablecoin
  console.log("Deploying MockStablecoin...");
  const Stablecoin = await hre.ethers.getContractFactory("MockStablecoin");
  const stablecoin = await Stablecoin.deploy();
  await stablecoin.waitForDeployment();
  const stablecoinAddress = await stablecoin.getAddress();
  console.log("MockStablecoin deployed to:", stablecoinAddress);

  // 2. Deploy FractionalBond (passing the stablecoin address to the constructor)
  console.log("Deploying FractionalBond...");
  const FractionalBond = await hre.ethers.getContractFactory("FractionalBond");
  const bond = await FractionalBond.deploy(stablecoinAddress);
  await bond.waitForDeployment();
  const bondAddress = await bond.getAddress();
  console.log("FractionalBond deployed to:", bondAddress);

  console.log("-----------------------------------------------");
  console.log("Deployment Complete!");
  console.log("Stablecoin Address:", stablecoinAddress);
  console.log("Bond Contract Address:", bondAddress);
  console.log("-----------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});