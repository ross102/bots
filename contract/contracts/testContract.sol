// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

import {HumanityCheck} from "./modifier.sol";

contract Test is HumanityCheck {
    uint256 public storageVar;

    function requiresHumanity() onlyHuman {
        storageVar = storageVar + 1;
    }
}
