pragma solidity ^0.4.17;

contract Policy {
    uint public acumulatedPremiums;
    uint public policyId;
    address public userAddress;
    uint public userID;
    string[] public risksCovered;

}