module.exports = function(deployer) {
  deployer.autolink();
  deployer.deploy(Project);
  deployer.deploy(FundingHub).then(function() {
  	return deployer.deploy(InitialProject, FundingHub.address, 1, 1485817200);
  });
};
