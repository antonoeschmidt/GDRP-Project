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
    // or just an array
    // string[] private dataIds; 
    mapping(string => string) private data;
    
    // this hashMap will hold dataId as Key, and a list of walletIds (or Company IDs), that have permission to that
    // specific data when permissions change, the walletId will either be added or removed from that specific dataId / entry
    mapping(string => address[]) private permissions;
    
    address owner;

    constructor() public {
        owner = msg.sender;
    }  
    
    // TODO: implement this. 
    function addData (string memory dataId, string memory hash) public {
         require(msg.sender == owner);
         address[] memory array;
         data[dataId] = hash; 
         permissions[dataId] = array;
    }

    // TODO: implement this. 
    function givePermission (address requester, string memory dataId) public {
         require(msg.sender == owner);
         address[] storage list = permissions[dataId];
         list.push(requester);
         permissions[dataId] = list;
    }

    // TODO: implement this. 
    // function revokePermission (companyId / wallet, dataId) {
    //      require(msg.sender == owner);
    //      list = permissions[dataId];
    //      list.remove(companyId);
    //      permissions[dataId] = list;
    // }

    // maybe, if we're going with hashMap
    // function updateData (string dataId, string hash) {
    //      require(msg.sender == owner);
    //      permissions[dataId] = hash;
    // }

}
