var Hub = artifacts.require("Hub");
var Policy = artifacts.require("Policy");
var User = artifacts.require("User");

var Adoption = artifacts.require("Adoption");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
  deployer.deploy(Hub);
  deployer.deploy(Policy);
  deployer.deploy(User);
};