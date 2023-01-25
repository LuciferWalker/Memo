// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./AccessToken.sol";

contract Marketplace {
    using Counters for Counters.Counter;
    Counters.Counter private projectCounter;

    //add creators to list to distribute royalties

    uint256 private projectCost;
    address payable memo;

    struct Project {
        uint256 projectId;
        string CID;
        AccessToken tokenAddress;
    }

    mapping(uint256 => Project) public projectIdToDetails;

    event ProjectCreated(
        uint256 indexed projectId,
        string CID,
        AccessToken tokenAddress
    );

    constructor(uint256 _projectCost) {
        memo = payable(msg.sender);
        projectCost = _projectCost;
    }

    modifier onlyMemo() {
        require(msg.sender == memo);
        _;
    }

    function createProject(
        string memory name,
        string memory symbol,
        uint256 maxSupply,
        uint256 tokenPrice,
        address[] memory creators,
        uint256[] memory shares
    ) public payable {
        require(msg.value >= projectCost, "Insufficient Amount");
        memo.transfer(msg.value);

        //deploy the access token
        AccessToken newAccessTokenContract = new AccessToken(
            name,
            symbol,
            maxSupply,
            tokenPrice,
            creators,
            shares
        );

        uint256 currentId = projectCounter.current();
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
        projectIdToDetails[_projectId].tokenAddress.mint{value:msg.value}();
    }

    function collectFunds(uint _projectId) public {
        require(_projectId < projectCounter.current(), "Invalid Project Id");
        projectIdToDetails[_projectId].tokenAddress.collectFunds();
    }
}
