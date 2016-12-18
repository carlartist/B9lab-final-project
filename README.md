# B9lab-final-project
B9lab final project
Date : 18-12-2016
Author : K. F. Artist
Subject : Final Project 

InitialProject contract
This contract is deployed by the migrations scripts, 2_deploy_contract.js after the fundinghub contract has been deployed. This contract will call the createproject function from the fundinghub contract to create an initial project.

FundingHub contract.
My fundinghub contact consists of a number a functions : The createProject(), the contribute(), the getContractInfo(), getProjectNumber(),
It  allows a user to add a new project to the FundingHub.  The createproject function deploys a new Project contract and keeps track of information about the created project in the projectInfo struct.
The creatproject function accepts the following values, the amount to be raised and the deadline.
The projectInfo struct consists of the following fields, to keep track of the newly created project contract : 
A projectnumber for mapping purposes, the address of the owner of the project, the address of the project itself, the amount to be raised, the raised amount and the deadline.

The contribute() function accepts three values, the contributer, projectmember and the contribution.
Based on this information it will retrieve other information from the struct before calling the fund function from the project contract.
All retrieved values are passed to the fund function to insure that a contribution has been made.

The other functions in the FundingHub contract are helper functions to perform various tasks.

Project contract.
My Project contact consists of a number a functions :  Project(), payout(),  fund (), refund ()
The project consists of a struct which keep track of the contributions made by the contributor.
The refund function will return the contribution to the contributor when the deadline of the project has passed or if the project reached it’s target.
The refund function is called by the fund function when the specified functions has been matched.
The fund() function will call the payout function when the raised amount is greater of equal then the amount to be raised.
The refund function will be called when the current date and time is greater then the deadline.
If none of this is true, the struct will be update and the fallback function will insure that the value send is added to the balance of the project contract.
Right now, the fund function does not exactly do what it is supposed to do, but when the conditions for payout and refund are met I do see the results as expected.

The payout()  will send the amount raised to the owner of the project contract once the full amount for the required target has been reached.
The payout function is called by the fund function when the specified functions has been matched.
 

Interface 
The interface consists of three sections:
- Create Project
This section consists of three fields required by createProject() from the 'FundingHub' contract: 
'Ethereum Address': This will be the owner of the new project contract
'Project Target': This will be the requred target to raise in wei
'Project Deadline': This will be the deadline of the project

- Contribute
This section consists of three fields required by contribute() from the 'FundingHub' contract:
'Contributor Address': The address of he person doing the contribution
'Contribute Address': The address of the project the contibution should go to
'Contribution': The amount in wei to contribute

- Get project info
This section consists of one input field required by getContractInfo() from the 'FundingHub' contract. 

The interface also has a number of buttons:
- Get Project Count
Pressing this button will retrieve the total number of created projects and update the 'Available projects' field of the interface. It calls getProjectNumber() from the 'FundingHub' contract.

- Get Project
Pressing this button will use the value from the 'Project number' field and retrieve details about the project to populate the following fields: 'Project owner', 'Project address', 'Project target', 'Project raised' and 'Project deadline'. It calls getContractInfo() from the 'FundingHub' contract. getContractInfo() requires a uint to be sent to it in order to 
retrieve information about a project. 

- Get All Projects
Pressing this button will retrieve all projects from the projectInfo struct defined in the 'FundingHub' contract. It does nothing more than output to the console for debugging/testing purposes. The code will loop through the total number of projects an call getContractInfo() from the 'FundingHub' contract for each project. The result for each project is printed to the javascript console.

- Create Project
Pressing this button will create a new project based on the values specified under the 'Create Project' section. The three required values are: 'Ethereum Address', 'Project Target' and 'Project Deadline'. It calls createProject() from the 'FundingHub' contract. The 'FundingHub' contract will create a new 'Project' contract based on the provided values.

- Contribute
Pressing this button will initiate a contribution to a 'Project' contract based on the information provided under the 'Contribute' section of the interface. The three required values are: 'Contributor Address', 'Contribute Address' and 'Contribution'. It calls contribute() from the 'FundingHub' contract. The 'FundingHub' project will in turn call fund() from the 'Project' contract which in turn will do a number of checks before calling payout(), refund() or the fallback function to add the sent value to the balance of the contract.

- Get Project Balance
Pressing this button will retrieve the balance of the contract and other accounts. It does nothing more than output the information to the console for debugging/testing purposes. It calls getBalance() from app.js which uses web3 to retrieve the balances. For this button to work, the 'Contribute Address' field must be filled in under the 'Contribute' section of the interface.
 

Automated (truffle) test.

The refund_function.js_test script is supposed to call the refund function from the project contract and send an amount to a predefined account simulating a refund. It should then compare the previous balance with the new balance and if not different throw an error.
The test probably doesn’t work as it is impossible to run the test du
