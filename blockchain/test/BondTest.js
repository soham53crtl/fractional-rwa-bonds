const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FractionalBond Yield Logic", function () {
  it("Should calculate yield correctly after 1 year", async function () {
    const [owner, user] = await ethers.getSigners();

    // 1. Deploy Mock Stablecoin
    const Stablecoin = await ethers.getContractFactory("MockStablecoin");
    const stablecoin = await Stablecoin.deploy();

    // 2. Deploy Bond Contract
    const Bond = await ethers.getContractFactory("FractionalBond");
    const bond = await Bond.deploy(await stablecoin.getAddress());

    // 3. Setup Investment (1000 tokens)
    const investment = ethers.parseEther("1000");
    await stablecoin.faucet(user.address, investment);
    await stablecoin.connect(user).approve(await bond.getAddress(), investment);
    await bond.connect(user).invest(investment);

    // 4. Fast-forward time by 1 year (31,536,000 seconds)
    await network.provider.send("evm_increaseTime", [31536000]);
    await network.provider.send("evm_mine");

    // 5. Check Yield (At 5% APY, 1000 should earn 50)
    const yieldEarned = await bond.calculateYield(user.address);
    // We expect roughly 50 (with small margin for block time)
    expect(ethers.formatEther(yieldEarned)).to.equal("50.0");
  });
});