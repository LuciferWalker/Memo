// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./AccessToken.sol";

contract MarketPlace {

    uint projectCounter;

    //add creators to list to distribute royalties

    address payable memo;

    struct Project{
        uint projectId;

    }

    mapping (uint => Project) public projectIdToDetails;


    constructor() {
        memo = payable(msg.sender);
    }

    function createProject(string memory name, string memory symbol, uint maxSupply, uint tokenPrice) public payable{
        require(msg.value > 2 ether, "Insufficient Amount");
        memo.transfer(msg.value);

        //deploy the access token
    }
    

    function getProjects() public view {
        //returns the projectCounter value. Then in front end we can run a loop till that id
    }
}
