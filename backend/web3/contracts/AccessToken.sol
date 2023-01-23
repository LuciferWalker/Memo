// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AccessToken is ERC20 {

    uint MAX_SUPPLY;
    uint tokenCounter;
    uint TOKEN_PRICE;
    address[] creators;
    uint[] shares;
    bool projectStatus = true;

    //add creators to list to distribute royalties

    constructor(string memory name, string memory symbol, string memory CID, uint maxSupply, uint tokenPrice, address[] memory creators, uint[] memory shares) ERC20(name, symbol) {
        require(creators.length == shares.length, "Length of creators and royalties array must be equal");
        MAX_SUPPLY = maxSupply;
        TOKEN_PRICE = tokenPrice;
        creators = creators;
        shares = shares;
    }

    modifier onlyMemo {
        require(msg.sender == memo);
        _;
    }

    //check if royalty distribution sum is valid

    // //create a system to gather funds and distribute after certain time or upon creators will 
    // function collectFunds(uint amount) internal {
        
    // }
     
    function distributeFunds(uint amount) private {
        for(int i = 0;i<creators.length;i++){
            creators[i].transfer(royalties[i]*amount);
        }
    }

    function mint() public payable {
        require(msg.value >= tokenPrice, "Insufficient Amount");
        require(tokenCounter < MAX_SUPPLY, "Tokens are sold out");
        require(balanceOf(msg.sender) == 0 , "You have already bought this token");
        _mint(msg.sender, 1);
        // collectFunds(msg.value);
        distributeFunds(msg.value);
        tokenCounter++;
        if(tokenCounter == MAX_SUPPLY){ //stops the project if all tokens are sold out
            updateProjectStatus(false);
        }
    }

    function updateProjectStatus(bool status) private{
        projectStatus = status;
    }

    // function maxSupply

    //transfer is not allowed
}
