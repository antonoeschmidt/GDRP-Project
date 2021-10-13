pragma solidity ^0.5.0;

contract SimpleCounter {
  uint public count = 0;

  function addCount() public {
      count++;
  }
}