pragma solidity ^0.4.2;

contract Project {
    address public owner;
    uint deadline;
    uint funds;
    bool reached;
    bool do_refund;
    
    event Payout(address, uint);
    event Refund(address, uint);
    event GotPayout(bool);
    event GotDeadline(bool);
    event GotContribute(bool);
    event ErrorPayout(bool);
    event ErrorDeadline(bool);
    
    // create mapping
    mapping(address => projectContributors) public contributors;
    
    // struct to store info about contributors
    struct projectContributors {
        address contributor;
        address project;
        uint funded;
    }
    
    // constructor
    function Project() {
        owner = msg.sender;
    }
    
    // called by FundingHub upon contribution (contribute function)
    // input: contributor, project, funded amount (keep track in struct)
    // if deadline passed or amount reached then return funded amount to transaction originator then
    // if amount reached do payout or
    // if deadline passed and goal not reached then call refund
    function fund(address project_owner, address contributor, address project, uint funded, uint raised, uint toraise, uint deadline) returns(bool) {
        // goal has been reached:
        // 1. return funded value to transaction originator
        // 2. payout to project owner
        if (raised >= toraise) {
            GotPayout(true);
            payout(project_owner, raised);
        }
        // deadline has passed:
        // 1. return funded value to transaction originator
        // 2. payout to project owner
        if (now > deadline) {
            GotDeadline(true);
            refund(contributor, funded);
        }
        // deadline has not passed
        if (now < deadline) {
            GotContribute(true);
            contributors[contributor].contributor = contributor;
            contributors[contributor].project = project;
            contributors[contributor].funded += funded;
        }
        return true;
    }
    
    // sends received funds to project owner
    function payout(address project, uint raised) returns(bool) {
        if (project.call.gas(500000).value(raised)()) {
            Payout(project, raised);
        }
        else {
            ErrorPayout(true);
        }
    }
    
    // returns individual contributions to contributors
    // input: contributor, project, funded
    function refund(address contributor, uint funded) returns(bool) {
        if (contributor.call.gas(500000).value(funded)()) {
            Refund(contributor, funded);
            return true;
        }
        else {
            ErrorDeadline(true);
            return false;
        }
    }
    
    function getContributions(address contributor) returns(address, address, uint) {
        return (contributors[contributor].contributor,contributors[contributor].project,contributors[contributor].funded);
    }

    function () payable {
        if (msg.value > 0) {
            var amount = msg.value;
            var sender = msg.sender;
        }
    }
    
}