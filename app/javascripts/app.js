var accounts;
var account;
var balance;

var fundingHub;
var fundingHub_addr;

function getTransactionReceiptMined(txn, interval) {
    console.log("getTransactionReceiptMined");
    var transactionReceiptAsync;
    interval |= 500;
    transactionReceiptAsync = function(txn, resolve, reject) {
      try {
        console.log("Trying...");
        var receipt = web3.eth.getTransactionReceipt(txn);
        if (receipt == null) {
            setTimeout(function () {
              transactionReceiptAsync(txn, resolve, reject);
            }, interval);
        } else {
          console.log("Transaction receipt confirmed, sending funds to target accounts...");
          getBalance();
          document.getElementById("status").innerHTML = "Transaction receipt confirmed, sending funds to target accounts...";
          resolve(receipt);
        }
      } catch(e) {
          reject(e);
      }
    };

    return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txn, resolve, reject);
    });
};

function getBalance() {
  console.log("getBalance");
  var from_addr = document.getElementById("from_addr").value;
  var to_addr = document.getElementById("to_addr").value;
  var amount = document.getElementById("contribution").value;

  console.log("Contract Balance: " + web3.eth.getBalance(to_addr));

  for (i = 0; i < accounts.length; i++) {
    console.log("Account " + web3.eth.accounts[i] + ": " + web3.eth.getBalance(web3.eth.accounts[i]));
  }

  //fundingHub.getBalance.call(to_addr, {from: from_addr, gas: 500000}).then(function(value) {
  //  console.log("Contract Balance 1: " + value.valueOf());
  //});
}

//function setStatus(message) {
//  var status = document.getElementById("status");
//  status.innerHTML = message;
//};

function contributeProject() {
  var from_addr = document.getElementById("from_addr").value;
  var to_addr = document.getElementById("to_addr").value;
  var amount = document.getElementById("contribution").value;
  var to_num = document.getElementById("prjnum").value;

  //var fundingProject = Project.at(to_addr);

  if (!project) {
    var project = Project.at(to_addr);
    project.allEvents(function (error, result) { 
      if (error) {
        console.log("Error: ");
        console.log(error);
      } else {
        console.log("Event: " + result.event);
        //console.log(result);
      }
    });
  }

  fundingHub.contribute(from_addr, to_num, amount, {from: from_addr, gas: 500000}).then(function(value) {
    console.log("Contribute: " + to_num + ", " + value.valueOf());
  });

  //fundingHub.sendFunds(to_addr, amount, {from: from_addr, gas: 500000}).then(function(value) {
  //  console.log("Send: " + to_addr + ", " + value.valueOf());
  //});
  
  var txn = web3.eth.sendTransaction({ from: from_addr, to: to_addr, value: amount, gas: 500000 });
  getTransactionReceiptMined(txn, 500);
}

function createProject() {
  var creator = document.getElementById("creator").value;
  var toraise = document.getElementById("target").value;
  var deadline = new Date(document.getElementById("deadline").value).getTime() / 1000;

  console.log("To Raise/Deadline: " + toraise + ", " + deadline);

  document.getElementById("status").innerHTML = "Transaction submitted, new project being created...";
  fundingHub.createProject(toraise, deadline, {from: creator, gas: 500000}).then(function(value) {
    console.log(value.valueOf());
    console.log(web3.eth.getTransactionReceipt(value));
    document.getElementById("status").innerHTML = "Transaction receipt confirmed, new project created...";

  }).catch(function(e) {
      document.getElementById("status").innerHTML = e;
      console.log(e);
  });
};

function getAllProjects() {
  fundingHub.getProjectNumber.call().then(function(value) {
    document.getElementById("projectNumber").innerHTML = value;
    console.log("Number of contracts: " + value.toNumber());

    var total_projects = value.toNumber();
    for (var i = 1; i <= total_projects; i++) {
      console.log(i);
      fundingHub.getContractInfo.call(i).then(function(value) {
        console.log(value);
      });
    }
  });
};

function getProject() {
  var prjnum = document.getElementById("prjnum").value;
  fundingHub.getContractInfo.call(prjnum).then(function(value) {
    console.log(value.valueOf());
    document.getElementById("projectOwner").innerHTML = value.valueOf()[0];
    document.getElementById("projectNum").innerHTML = value.valueOf()[1];
    document.getElementById("projectToRaise").innerHTML = value.valueOf()[2].c[0];
    document.getElementById("projectRaised").innerHTML = value.valueOf()[3].c[0];
    document.getElementById("projectDeadline").innerHTML = value.valueOf()[4].c[0];
  });
};

function getProjectNumber() {
  fundingHub.getProjectNumber.call().then(function(value) {
    document.getElementById("projectNumber").innerHTML = value;
    console.log("Number of contracts: " + value.toNumber());
  });
};

window.onload = function() {
  fundingHub = FundingHub.deployed();
  fundingHub_addr = fundingHub.address;

  /*fundingHub.allEvents(function (error, result) { 
    if (error) {
      console.log("Error: ");
      console.log(error);
    } else {
      console.log("Event: " + result.event);
      //console.log(result);
    }
  });*/

  fundingHub.getProjectNumber.call().then(function(value) {
    document.getElementById("projectNumber").innerHTML = value;
    console.log("Number of contracts: " + value.toNumber());
  });

  console.log(fundingHub);
  console.log(fundingHub_addr);

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    console.log("All accounts: ");
    console.log(accounts);

    for (i = 0; i < accounts.length; i++) {
      console.log("Account " + web3.eth.accounts[i] + ": " + web3.eth.getBalance(web3.eth.accounts[i]));
    }

  });
}
