require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./web3/artifacts",
    sources: "./web3/contracts",
    cache: "./web3/cache",
    tests: "./web3/test"
  },
};