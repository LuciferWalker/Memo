// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./AccessToken.sol";

contract MarketPlace {

    using Counters for Counters.Counter;
    Counters.Counter private projectCounter;

    //add creators to list to distribute royalties

    uint private projectCost;
    address payable memo;

    struct Project{
        uint projectId;
        string CID;
        AccessToken tokenAddress;
    }


    mapping (uint => Project) public projectIdToDetails;


    event ProjectCreated(uint indexed projectId, string CID, AccessToken tokenAddress);

    constructor(uint _projectCost) {
        memo = payable(msg.sender);
        projectCost = _projectCost;
    }


    function createProject(string memory name, string memory symbol, string memory CID, uint maxSupply, uint tokenPrice, address[] memory creators, uint[] memory shares) public payable{
        require(msg.value >= projectCost, "Insufficient Amount");
        memo.transfer(msg.value);

        //deploy the access token
        AccessToken newAccessTokenContract = new AccessToken(name, symbol, maxSupply, tokenPrice, creators, shares);

        uint currentId = projectCounter.current();
        projectCounter.increment();
        projectIdToDetails[currentId] = Project(
            currentId,
            CID,
            newAccessTokenContract
        );
        emit ProjectCreated(currentId, CID, newAccessTokenContract);
    }
    
    function getProjects() public view {
        //returns the projectCounter value. Then in front end we can run a loop till that id
    }

    function buyProjectToken(uint _projectId) public payable {
        require(_projectId < projectCounter.current(), "Invalid Project Id");
        // Calls mint function of the token
        projectIdToDetails[_projectId].tokenAddress.mint();
    }

}