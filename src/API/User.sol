pragma solidity ^0.4.17;

contract User {
    uint public userID;
    string public userName;
    uint public region;
    bool public inscope;
    address[] wallets;

    function User(uint _userID, string _userName, uint _region, bool _inscope) public {
      userID = _userID;
      userName = _userName;
      region = _region;
      inscope = _inscope;
    }

    function payPremium() public returns (uint) {   
    uint  premiumPayed = 10;
    return premiumPayed;
  }
}