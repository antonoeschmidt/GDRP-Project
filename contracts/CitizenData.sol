pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2; //only for testing

contract CitizenData {
    mapping(address => bool) private healthData;
    mapping(address => bool) private bankData;
    mapping(address => bool) private cprData;

    string private healthRef;
    string private bankRef;
    string private cprRef;

    address owner;

    constructor() public {
        owner = msg.sender;
        healthRef = "1111";
        bankRef = "2222";
        cprRef = "3333";
    }

    function getHealthDataRef(address companyId) public view returns (string memory) {
        require(healthData[companyId]);
        return healthRef;
    }

    function getBankDataRef(address companyId) public view returns (string memory) {
        require(bankData[companyId]);
        return bankRef;
    }

    function getCprDataRef(address companyId) public view returns (string memory) {
        require(cprData[companyId]);
        return cprRef;
    }

    function setHealthPermission(address companyId, bool permission)
        public
        returns (string memory)
    {
        require(msg.sender == owner);
        healthData[companyId] = permission;

        return "Permission changed";
    }

    function setBankPermission(address companyId, bool permission)
        public
        returns (string memory)
    {
        require(msg.sender == owner);
        bankData[companyId] = permission;

        return "Permission changed";
    }

    function setCprPermission(address companyId, bool permission)
        public
        returns (string memory)
    {
        require(msg.sender == owner);
        cprData[companyId] = permission;

        return "Permission changed";
    }
}
