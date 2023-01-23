// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AccessToken is ERC20 {

    uint MAX_SUPPLY;
    uint counter;
    uint TOKEN_PRICE;

    //add creators to list to distribute royalties

    constructor(string memory name, string memory symbol, uint maxSupply, uint tokenPrice) ERC20(name, symbol) {
        MAX_SUPPLY = maxSupply;
        TOKEN_PRICE = tokenPrice;
    }

    function mint() public {
        require(counter <= MAX_SUPPLY, "Tokens are sold out");
        require(balanceOf(msg.sender) == 0 , "You have already bought this token");
        _mint(msg.sender, 1);
        counter++;
    }

    //transfer is not allowed
}
