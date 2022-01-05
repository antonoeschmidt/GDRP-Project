// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2; //only for testing

contract Citizen {
    // -- Data IDs must be stored, because it is impossible to retrieve from a hash map afterwards --
    // Could either be stored in a hashmap where all dataIds are keys, 
    // and their hashed content are stored as the value to prevent tampering with the data
    // could look like this -V
    // mapping(string => string) private data;
    // the dataIds could be encrypted from the backEnd if necessary (symmertic /AES or asymmertic RSA)
    mapping(string => string) private data;
    
    // this hashMap will hold dataId as Key, and a list of walletIds (or Company IDs), that have permission to that
    // specific data when permissions change, the walletId will either be added or removed from that specific dataId / entry
    // Update: might be change to struct Permission {address address, uint256 timestamp} to have time-specific
    // permissions supported. mapping(string => Permission[]) private permissions;
    struct Permission{
        address companyAddress;
        uint retention;
    }
    mapping(string => Permission[]) private permissions;    

    address owner;
    constructor() public {
        owner = msg.sender;
    }  

    function addData (string memory dataId, string memory hash) public {
         require(msg.sender == owner);
         data[dataId] = hash;
    }

    function givePermission (address requester, string memory dataId, uint retention) public {
         require(msg.sender == owner);
         Permission[] storage list = permissions[dataId];
         list.push(Permission(requester, retention));
         permissions[dataId] = list;
    }

    function getPermission (address requester, string memory dataId) public view returns (bool) {
         Permission[] storage list = permissions[dataId];
         for (uint i = 0; i < list.length; i++) {
             if (list[i].companyAddress == requester 
                && list[i].retention > now) {
                return true;
             }
         }
         return false;
    }

     function revokePermission (address requester, string memory dataId) public {
        require(msg.sender == owner);
        Permission[] storage list = permissions[dataId];
        for (uint i = 0; i < list.length; i++) {
             if (list[i].companyAddress == requester) {
                 delete list[i];
             }
         }
        permissions[dataId] = list;
    } 

    // maybe, if we're going with hashMap
    // function updateData (string dataId, string hash) {
    //      require(msg.sender == owner);
    //      permissions[dataId] = hash;
    // }

}
