contract('Project', function(accounts) {
  it("should assert true", function(done) {
    var project = Project.at(Project.deployed);
    var acc_bal_bef = web3.eth.getBalance(web3.eth.accounts[1]);
    return project.refund(web3.eth.accounts[1], 1000000000000000000).then(function(value) {
        assert.equal(web3.eth.getBalance(web3.eth.accounts[1]), web3.eth.getBalance(web3.eth.accounts[1]) - acc_bal_bef, "Sent OK");
        done();
    });
  });
});
