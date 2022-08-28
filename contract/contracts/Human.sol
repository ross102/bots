// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import {APIConsumer} from "./APIConsumer.sol";

abstract contract Context {
  function _msgSender() internal view virtual returns (address) {
    return msg.sender;
  }
}

contract Human is Context {
  string public constant status = "approved";
  address constant consumerContract = ""; // fillup
  APIConsumer consumer = APIConsumer(consumerContract);

  modifier onlyHuman() {
    _isVerified();
    _;
  }

  function _isVerified() internal view virtual {
    require(isVerified() == true, "has not pass human verification");
  }

  function isVerified() public view returns (bool) {
    string _status = consumer.getVerificationStatus(_msgSender());
    if (_status == status) return true;
    return false; // return the verification status
  }
}
