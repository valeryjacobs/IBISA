pragma solidity ^0.4.17;

contract User {
    uint public userID;
    uint public payPremium;

    address[] public policies;


    // Adopting a pet
    function payPremium() public returns (uint) {
    
    uint  premiumPayed = 10;
    
    return premiumPayed;
  }
}