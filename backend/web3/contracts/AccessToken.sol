// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AccessToken is ERC20 {
    using Counters for Counters.Counter;
    Counters.Counter private tokenCounter;

    uint256 public MAX_TOKEN_SUPPLY;
    uint256 public TOKEN_PRICE;
    address[] public creators;
    uint256[] public shares;
    bool public projectStatus = true;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxTokenSupply,
        uint256 _tokenPrice,
        address[] memory _creators,
        uint256[] memory _shares
    ) ERC20(_name, _symbol) {
        MAX_TOKEN_SUPPLY = _maxTokenSupply;
        TOKEN_PRICE = _tokenPrice;
        creators = _creators;
        shares = _shares;
    }

    mapping(address => uint256) public creatorBalance;

    //check if royalty distribution sum is valid

    function collectFunds(address userAddress) public {
        require(creatorBalance[userAddress] > 0, "Your balance is zero");
        payable(userAddress).transfer(creatorBalance[userAddress]);
        creatorBalance[userAddress] = 0;
    }

    function distributeFunds(uint256 _amount) private {
        for (uint256 i = 0; i < creators.length; i++) {
            creatorBalance[creators[i]] += (shares[i] * _amount) / 100;
        }
    }

    function mint(address minterAddress) public payable {
        require(msg.value >= TOKEN_PRICE, "Insufficient Amount");
        require(
            tokenCounter.current() < MAX_TOKEN_SUPPLY,
            "Tokens are sold out"
        );
        require(
            balanceOf(minterAddress) == 0,
            "You have already bought this token"
        );
        _mint(minterAddress, 1000000000000000000);
        distributeFunds(msg.value);
        tokenCounter.increment();
        if (tokenCounter.current() == MAX_TOKEN_SUPPLY) {
            updateProjectStatus(false); //stops the project if all tokens are sold out
        }
    }

    function updateProjectStatus(bool _status) private {
        projectStatus = _status;
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _amount
    ) internal override {
        revert(); //transfer is not allowed
    }

    function getMyShareAmount(address userAddress)
        public
        view
        returns (uint256)
    {
        return creatorBalance[userAddress];
    }

    function getProjectStatus() public view returns (bool) {
        return projectStatus;
    }
}
