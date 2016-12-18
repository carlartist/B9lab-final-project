pragma solidity ^0.4.2;

import "FundingHub.sol";

contract InitialProject {
    address public owner;
    FundingHub public fundingHub;
    
    function InitialProject(address fundingHubAddr, uint funding, uint deadline) {
        owner = msg.sender;
        
        fundingHub = FundingHub(fundingHubAddr);
        fundingHub.createProject(funding, deadline);
    }
}