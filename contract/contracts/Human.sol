// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {AreYouHuman} from "./AreYouHuman.sol";

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction. While these are generally available
 * via msg.sender, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
  function _msgSender() internal view virtual returns (address) {
    return msg.sender;
  }
}

/**
 * @dev Contract module which provides a basic humanity check mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions only if identity verification is passed.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyHuman`, which can be applied to your functions to restrict unverified users.
 */
contract Human is Context {
  // const CONSUMER_CONTRACT: the api consumer contract
  address constant CONSUMER_CONTRACT =
    0xf3ee05925Ffcd122930C870d7c0FB5E9cc86F489;
  AreYouHuman consumer = AreYouHuman(CONSUMER_CONTRACT);

  /**
   * @dev Throws if called by any account that has not verified identity.
   */
  modifier onlyHuman() {
    _isVerified();
    _;
  }

  /**
   * @dev Throws if the sender verification status is not `approved`.
   */
  function _isVerified() internal view virtual {
    require(
      (keccak256(bytes("approved")) == keccak256(bytes(getStatus()))) == true,
      "human verification required!"
    );
  }

  /**
   * @dev returns verification status of the sender from the consumer contract.
   */
  function getStatus() internal view returns (string memory) {
    return consumer.getVerificationStatus(_msgSender());
  }
}
