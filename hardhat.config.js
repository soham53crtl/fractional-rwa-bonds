import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.20",
  paths: {
    sources: "blockchain/contracts",
    tests: "blockchain/test",
    scripts: "blockchain/scripts",
    artifacts: "artifacts",
  },
};
