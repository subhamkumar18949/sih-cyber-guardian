// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AlertContract is Ownable {
    // This is the new part you need to add
    constructor() Ownable(msg.sender) {
        // This sets the person who deploys the contract as the owner.
    }

    struct Alert {
        uint256 id;
        string contentHash;
        uint256 timestamp;
        address reporter;
    }

    mapping(uint256 => Alert) public alerts;
    uint256 public alertCount;

    event AlertCreated(uint256 id, string contentHash, address reporter);

    function createAlert(string memory _contentHash) public onlyOwner {
        alertCount++;
        alerts[alertCount] = Alert(alertCount, _contentHash, block.timestamp, msg.sender);
        emit AlertCreated(alertCount, _contentHash, msg.sender);
    }
}