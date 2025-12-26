const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FractionalBond interest accrual", function () {
  const SECONDS_IN_YEAR = 31536000;

  it("accrues ~5% interest over one year for 500 bps APY", async function () {
    const [deployer, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockStablecoin");
    const token = await Token.connect(deployer).deploy();
    await token.deployed();

    const Bond = await ethers.getContractFactory("FractionalBond");
    const bond = await Bond.connect(deployer).deploy(token.address, 500); // 500 bps = 5%
    await bond.deployed();

    const principal = ethers.parseUnits("1.0", 18); // 1.0 tokens

    // Mint and approve
    await token.mint(user.address, principal);
    await token.connect(user).approve(bond.target, principal);

    // Deposit
    await bond.connect(user).deposit(principal);

    // Advance time one year
    await ethers.provider.send("evm_increaseTime", [SECONDS_IN_YEAR]);
    await ethers.provider.send("evm_mine");

    // Withdraw
    await bond.connect(user).withdraw();

    const finalBalance = await token.balanceOf(user.address);

    // Expect 5% interest: 1.05 tokens
    const expected = principal * 105n / 100n; // integer arithmetic

    // allow 1-2 wei slop
    expect(finalBalance).to.equal(expected);
  });
});
