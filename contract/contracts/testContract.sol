// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import {Human} from "./Human.sol";

contract Test is Human {
  uint256 public storageVar;

  function requiresHumanity() public onlyHuman {
    storageVar = storageVar + 1;
  }
}
