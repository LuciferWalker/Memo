// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AccessToken is ERC20 {

    uint MAX_SUPPLY;
    uint public tokenCounter;
    uint public TOKEN_PRICE;
    address[] creators;
    uint[] shares;
    bool projectStatus = true;

    //add creators to list to distribute royalties

    constructor(string memory _name, string memory _symbol, uint _maxSupply, uint _tokenPrice, address[] memory _creators, uint[] memory _shares) ERC20(_name, _symbol) {
        require(creators.length == shares.length, "Length of creators and royalties array must be equal");
        MAX_SUPPLY = _maxSupply;
        TOKEN_PRICE = _tokenPrice;
        creators = _creators;
        shares = _shares;
    }

    //check if royalty distribution sum is valid

    // //create a system to gather funds and distribute after certain time or upon creators will 
    // function collectFunds(uint amount) internal {
        
    // }
     
    function distributeFunds(uint _amount) private {
        for(uint i = 0; i<creators.length;i++){
            payable(creators[i]).transfer(shares[i]*_amount);
        }
    }

    function mint() public payable {
        require(msg.value >= TOKEN_PRICE, "Insufficient Amount");
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

    function updateProjectStatus(bool _status) private{
        projectStatus = _status;
    }

    function getProjectStatus() public view returns(bool) {
        return projectStatus;
    }

    function _transfer(address _from, address _to, uint _amount) internal override {
        revert(); //transfer is not allowed
  }
  
    // function _maxSupply

    //override burn and other relevant functions as well

    
}
