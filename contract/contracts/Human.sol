// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

contract Human is Context {
    modifier onlyHuman() {
        _isVerified();
        _;
    }

    function _isVerified() internal view virtual {
        require(isVerified() == true, "has not pass human verification");
    }

    function isVerified() public pure returns (bool) {
        // call some functions perform some computations
        return (true); // return the verification status
    }
}
