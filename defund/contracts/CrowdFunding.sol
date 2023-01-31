// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {

    struct Donator {
        address account;
        uint256 amount;
    }

    struct Campaign {
        address owner;
        // mapping (address => uint256) totalDonations;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        Donator [] donators;
        string title;
        string description;
        string imageUri;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount = 0;

    constructor() {}

    function createCampaign(
        address _owner, 
        string memory _title, 
        string memory _description, 
        uint256 _target, 
        uint256 _deadline, 
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[campaignCount];

        require(_deadline > block.timestamp, "DeFund: Deadline should be a date/time in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.imageUri = _image;

        campaignCount ++;

        return campaignCount - 1;
    }

    function donateToCampaign(uint256 _id) public payable {

        Campaign storage campaign = campaigns[_id];

        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");

        if (sent) {
            campaign.donators.push(Donator({account: msg.sender, amount: msg.value}));
            // campaign.totalDonations[msg.sender] += msg.value;
            campaign.amountCollected += msg.value;
        }
    }

    function getDonators(uint256 _id) public view returns (Donator[] memory) {
        return campaigns[_id].donators;
    }

    function getCampaignById(uint256 _id) public view returns (Campaign memory) {
        Campaign memory campaign = campaigns[_id];
        return campaign;
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCount);
        for (uint256 i = 0; i < campaignCount; i ++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }

}