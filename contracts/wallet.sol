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

    Policy[] public policies;

    function Indemnify() public returns(uint) {
        uint indemnifiedTotal = 0;
        for (uint i = 0; i < policies.length; i++) {
            indemnifiedTotal+=10; 
            }      
    }

    function AddPolicy(string policyName, string riskCovered,uint policyPremium, uint indemnityAmount,uint currentAmount) public returns(uint) {
        policies.push(Policy(policyName,riskCovered,policyPremium,indemnityAmount,currentAmount));

              
    }
}