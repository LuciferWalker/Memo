// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./AccessToken.sol";

contract Marketplace {
    using Counters for Counters.Counter;
    Counters.Counter private projectCounter; //Project Counter
    uint256 private projectCreationFee; //Project creation fee
    address payable public memo; //Address of MEMO

    //Constructor
    constructor(uint256 _projectCreationFee) {
        require(
            _projectCreationFee >= 0,
            "Project creation fee must be positive"
        );
        memo = payable(msg.sender);
        projectCreationFee = _projectCreationFee;
    }

    //Structures
    struct Project {
        //Project Structure
        uint256 projectId; //Id of the project
        string cid; //CID of the file uploaded for the project
        AccessToken tokenAddress; //Instance of the access token contract associated with the project
    }

    //Mappings
    mapping(uint256 => Project) public projectIdToDetails; //Maps project id to its details

    //Events
    event ProjectCreated(
        //Event for when a project is created
        uint256 indexed projectId,
        string indexed cid,
        AccessToken tokenAddress
    );

    //Modifiers
    modifier onlyMemo() {
        require(msg.sender == memo);
        _;
    }

    //Functions

    function checkSharesArray(uint256[] memory _shares) private returns (bool) {
        uint256 sum;
        for (uint256 i = 0; i < _shares.length; i++) {
            sum += _shares[i];
        }

        return sum == 100;
    }

    function createProject(
        string memory name,
        string memory symbol,
        uint256 maxTokenSupply,
        uint256 tokenPrice,
        address[] memory creators,
        uint256[] memory shares,
        string memory cid
    ) public payable {
        require(msg.value >= projectCreationFee, "Insufficient Amount");
        require(creators.length > 0, "There must be atleast one creator");
        require(
            creators.length == shares.length,
            "Length of creators and royalties array must be equal"
        );
        require(
            checkSharesArray(shares),
            "Sum of royalty distribution must be equal to 100"
        );

        //deploy the access token contract
        AccessToken newAccessTokenContract = new AccessToken(
            name,
            symbol,
            maxTokenSupply,
            tokenPrice,
            creators,
            shares
        );

        uint256 currentId = projectCounter.current();
        projectIdToDetails[currentId] = Project(
            currentId,
            cid,
            newAccessTokenContract
        );

        projectCounter.increment();

        memo.transfer(msg.value);
        emit ProjectCreated(currentId, cid, newAccessTokenContract);
    }

    // Not needed if mapping can be accessed by the code
    // function getProjectDetails(uint _projectId) public view {
    //     require(_projectId < projectCounter.current(), "Invalid Project Id");
    //     return projectIdToDetails[_projectId];
    // }

    function buyProjectToken(uint256 _projectId) public payable {
        require(_projectId < projectCounter.current(), "Invalid Project Id");
        // Calls mint function of the token
        projectIdToDetails[_projectId].tokenAddress.mint{value: msg.value}(
            msg.sender
        );
    }

    function collectFunds(uint256 _projectId) public {
        require(_projectId < projectCounter.current(), "Invalid Project Id");
        projectIdToDetails[_projectId].tokenAddress.collectFunds(msg.sender);
    }

    function getMyShareAmount(uint256 _projectId)
        public
        view
        returns (uint256)
    {
        require(_projectId < projectCounter.current(), "Invalid Project Id");
        return
            projectIdToDetails[_projectId].tokenAddress.getMyShareAmount(
                msg.sender
            );
    }

    function updateProjectCreationFee(uint256 _newFee) public onlyMemo {
        projectCreationFee = _newFee;
    }

    function getCurrentProjectCounter() public view returns (uint256) {
        return projectCounter.current();
    }

    function getProjectCreationFee() public view returns (uint256) {
        return projectCreationFee;
    }
}
