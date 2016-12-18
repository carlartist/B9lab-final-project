pragma solidity ^0.4.2;

import "Project.sol";

contract FundingHub {
    address public owner;
    Project public fundingProject;
    FundingHub public fundingHub;
    
    uint deadline;
    uint funds;
    uint prjNumber;
    
    event ProjectCreated(address fundingProject,uint funds,uint deadline);
    event ContributionReceived(address contributor,address project,uint contribution);
    
    // create mapping
    //mapping(address => projectInfo) public projects;
    mapping(uint => projectInfo) public projects;
    
    // struct to store info about project
    struct projectInfo {
        uint prjNumber;
        address prjOwner;
        address prjAddr;
        uint prjToRaise;
        uint prjRaised;
        uint prjDeadline;
    }
    
    // constructor
    function FundingHub() {
        owner = msg.sender;
    }
    
    // input: deadline, target 
    function createProject(uint funds, uint deadline) returns(address, uint, uint) {
        fundingProject = new Project();
        
        uint projectNum = prjNumber++;
        
        // add project info to struct
        projects[prjNumber].prjNumber = projectNum;
        projects[prjNumber].prjOwner = msg.sender;
        projects[prjNumber].prjAddr = fundingProject;
        projects[prjNumber].prjToRaise = funds;
        projects[prjNumber].prjRaised = 0;
        projects[prjNumber].prjDeadline = deadline;
        
        ProjectCreated(fundingProject, funds , deadline);
        
        return (fundingProject, funds, deadline);
    }
    
    // input: contributor addr, project number, contribution amount
    function contribute(address contributor, uint projectNum, uint contribution) returns(address, address, uint, uint, uint) {
        projects[projectNum].prjRaised += contribution;
        address project_owner = projects[projectNum].prjOwner;
        address project = projects[projectNum].prjAddr;
        uint raised = projects[projectNum].prjRaised;
        uint toraise = projects[projectNum].prjToRaise;
        uint deadline = projects[projectNum].prjDeadline;
        fundingProject = Project(project);
        
        ContributionReceived(contributor, project, contribution);
        
        fundingProject.fund(project_owner, contributor, project, contribution, raised, toraise, deadline);
        
        return (contributor, project, contribution, raised, toraise);
    }
    
    // get current contract info
    function getContractInfo(uint projectNum) returns(address, address, uint, uint, uint) {
        address prjOwner = projects[projectNum].prjOwner;
        address prjAddr = projects[projectNum].prjAddr;
        uint prjToRaise = projects[projectNum].prjToRaise;
        uint prjRaised = projects[projectNum].prjRaised;
        uint prjDeadline = projects[projectNum].prjDeadline;
        
        return (prjOwner, prjAddr, prjToRaise, prjRaised, prjDeadline);
    }
    
    function getProjectNumber() returns (uint) {
        return prjNumber;
    }

    function () payable {
        if (msg.value > 0) {
            var amount = msg.value;
            var sender = msg.sender;
        }
    }
    
}