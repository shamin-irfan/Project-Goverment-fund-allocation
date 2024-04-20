// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GovernmentFundAllocation {
    address public owner;
    mapping(address => bool) public governmentOfficials;
    struct Allocation {
        uint amount;
        string purpose;
        string companyName;
    }
    mapping(address => Allocation) public allocations;
    address[] private recipients;

    event FundsAllocated(address recipient, uint amount, string purpose, string companyName);
    event OfficialAdded(address official);
    event OfficialRemoved(address official);

    constructor() {
        owner = 0xcF3b36Cb9cb58315015fD68f83bb6F1dD555D021;
        // Automatically add the contract creator as a government official
        governmentOfficials[0xcF3b36Cb9cb58315015fD68f83bb6F1dD555D021] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyGovernmentOfficial() {
        require(governmentOfficials[msg.sender], "Not a government official");
        _;
    }

    function addGovernmentOfficial(address _official) public onlyOwner {
        governmentOfficials[_official] = true;
        emit OfficialAdded(_official);
    }

    function removeGovernmentOfficial(address _official) public onlyOwner {
        governmentOfficials[_official] = false;
        emit OfficialRemoved(_official);
    }

    function allocateFunds(address recipient, uint amount, string memory purpose, string memory companyName) public onlyGovernmentOfficial {
        allocations[recipient] = Allocation(amount, purpose, companyName);
        recipients.push(recipient); // Keep track of all recipients
        emit FundsAllocated(recipient, amount, purpose, companyName);
    }

    function deallocateFunds(address recipient) public onlyGovernmentOfficial {
        delete allocations[recipient];
        // Remove recipient from the tracking array, not implemented for simplicity
    }

    function editAllocation(address recipient, uint newAmount) public onlyGovernmentOfficial {
        allocations[recipient].amount = newAmount;
    }

    // New function to return all allocation details
    function getAllAllocations() public view returns (uint[] memory, string[] memory, string[] memory) {
        uint[] memory amounts = new uint[](recipients.length);
        string[] memory purposes = new string[](recipients.length);
        string[] memory companyNames = new string[](recipients.length);

        for (uint i = 0; i < recipients.length; i++) {
            Allocation storage allocation = allocations[recipients[i]];
            amounts[i] = allocation.amount;
            purposes[i] = allocation.purpose;
            companyNames[i] = allocation.companyName;
        }
        return (amounts, purposes, companyNames);
    }
}
