// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./AccessToken.sol";

contract Marketplace {
    using Counters for Counters.Counter;
    Counters.Counter private projectCounter;

    //add creators to list to distribute royalties

    uint256 private fee;
    address payable memo;

    struct Project {
        uint256 projectId;
        AccessToken tokenAddress;
    }

    mapping(uint256 => Project) public projectIdToDetails;

    event ProjectCreated(uint256 indexed projectId, AccessToken tokenAddress);

    constructor(uint256 _fee) {
        memo = payable(msg.sender);
        fee = _fee;
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
    ) public payable returns (AccessToken) {
        require(msg.value >= fee, "Insufficient Amount");
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
            newAccessTokenContract
        );
        emit ProjectCreated(currentId, newAccessTokenContract);

        return newAccessTokenContract;
    }

    function getProjects() public view {
        //returns the projectCounter value. Then in front end we can run a loop till that id
    }

    function buyProjectToken(uint256 _projectId) public payable {
        require(_projectId < projectCounter.current(), "Invalid Project Id");
        // Calls mint function of the token
        // address(projectIdToDetails[_projectId].tokenAddress).delegatecall(abi.encodeWithSelector(AccessToken.mint.selector));
        projectIdToDetails[_projectId].tokenAddress.mint{value: msg.value}(
            msg.sender
        );
    }

    function collectFunds(uint256 _projectId) public {
        require(_projectId < projectCounter.current(), "Invalid Project Id");
        // address(projectIdToDetails[_projectId].tokenAddress).delegatecall(abi.encodeWithSelector(AccessToken.collectFunds.selector));
        projectIdToDetails[_projectId].tokenAddress.collectFunds(msg.sender);
    }

    function getMyShareAmount(uint256 _projectId)
        public
        view
        returns (uint256)
    {
        return
            projectIdToDetails[_projectId].tokenAddress.getMyShareAmount(
                msg.sender
            );
    }
}
