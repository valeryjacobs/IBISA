pragma solidity ^0.4.17;

contract Hub {
    //address[8] public users;
    mapping (uint=>address) public users;
    address[] public userAddresses;
    

    
    function collect() public view returns(uint) {
        uint amountCollected = 0;
        
        for (uint i = 0; i < userAddresses.length; i++) {
            amountCollected+=10;
        }
        
        return amountCollected;
    }

  
    function getUsers() public view returns(address[]) {
        return userAddresses;
    }

    function registerUser(uint id, address user) public {
        users[id] = msg.sender;
        userAddresses.push(user);
    }
}