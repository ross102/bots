// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {AreYouHuman} from "./AreYouHuman.sol";

abstract contract Context {
  function _msgSender() internal view virtual returns (address) {
    return msg.sender;
  }
}

contract Human is Context {
  address constant consumerContract =
    0x9EbAd392C3ecAe0CEb9b554b94ab44F2c21B8504; // fillup
  AreYouHuman consumer = AreYouHuman(consumerContract);

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
