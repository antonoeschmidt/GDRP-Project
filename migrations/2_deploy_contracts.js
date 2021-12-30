const SimpleCounter = artifacts.require("./SimpleCounter.sol");
const Citizen = artifacts.require("./Citizen.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(SimpleCounter)
  deployer.deploy(Citizen)
}

