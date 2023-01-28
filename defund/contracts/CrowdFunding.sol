// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {

    struct Campaign {
        address owner;
        address [] donators;
        uint256 target;
        uint256 deadLine;
        uint256 amountCollected;
        uint256 [] donations;
        string title;
        string description;
        string imageUri;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount = 0;

    function createCampaign() public {}

    function donateToCampaign() public {}

    function getDonators() public {}

    function getCampaigns() public {}

    constructor() {}
}