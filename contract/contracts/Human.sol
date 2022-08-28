// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import {APIConsumer} from "./APIConsumer.sol";

abstract contract Context {
  function _msgSender() internal view virtual returns (address) {
    return msg.sender;
  }
}

contract Human is Context {
  address constant consumerContract =
    0x9Eb6dd0D51522a6aece199B77c431995e58697eB; // fillup
  APIConsumer consumer = APIConsumer(consumerContract);

  modifier onlyHuman() {
    _isVerified();
    _;
  }

  function _isVerified() internal view virtual {
    require(isVerified() == true, "has not pass human verification");
  }

  function isVerified() public view returns (bool) {
    string memory status = "approved";
    string memory _status = consumer.getVerificationStatus(_msgSender());
    if (keccak256(bytes(_status)) == keccak256(bytes(status))) return true;
    return false; // return the verification status
  }
}
