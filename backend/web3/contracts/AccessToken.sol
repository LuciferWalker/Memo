// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AccessToken is ERC20 {
    uint256 MAX_SUPPLY;
    uint256 public tokenCounter;
    uint256 public TOKEN_PRICE;
    address[] creators;
    uint256[] shares;
    bool projectStatus = true;

    //add creators to list to distribute royalties

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply,
        uint256 _tokenPrice,
        address[] memory _creators,
        uint256[] memory _shares
    ) ERC20(_name, _symbol) {
        require(
            creators.length == shares.length,
            "Length of creators and royalties array must be equal"
        );
        MAX_SUPPLY = _maxSupply;
        TOKEN_PRICE = _tokenPrice;
        creators = _creators;
        shares = _shares;

        //mint a token for all creators
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

    function mint(address minterAddress) public payable returns (bool) {
        require(msg.value >= TOKEN_PRICE, "Insufficient Amount");
        require(tokenCounter < MAX_SUPPLY, "Tokens are sold out");
        require(
            balanceOf(minterAddress) == 0,
            "You have already bought this token"
        );
        _mint(minterAddress, 1000000000000000000); //1 token
        distributeFunds(msg.value);
        tokenCounter++;
        if (tokenCounter == MAX_SUPPLY) {
            //stops the project if all tokens are sold out
            updateProjectStatus(false);
        }
    }

    function updateProjectStatus(bool _status) private {
        projectStatus = _status;
    }

    function getProjectStatus() public view returns (bool) {
        return projectStatus;
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

    // function _maxSupply
}

//2. use function parameter
//3. use contract data from web2 storage
