pragma solidity ^0.4.17;

contract Wallet {
    uint public walletID;
    uint public noPolicies;

     struct Policy { // Struct
        string policyName;
        string riskCovered;
        uint policyPremium;
        uint indemnityAmount;
        uint currentAmount;
    }
}