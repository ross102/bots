// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract APIConsumer is ChainlinkClient, Ownable {
  using Chainlink for Chainlink.Request;

  uint256 public status;
  address private immutable oracle;
  bytes32 private immutable jobId;
  uint256 private immutable fee;

  event RequestStatus(bytes32 indexed requestId, uint256 status);

  /**
   * @notice Executes once when a contract is created to initialize state variables
   *
   * @param _oracle - address of the specific Chainlink node that a contract makes an API call from
   * @param _jobId - specific job for :_oracle: to run; each job is unique and returns different types of data
   * @param _fee - node operator price per API call / data request
   * @param _link - LINK token address on the corresponding network
   *
   * Network: goerli
   * Oracle: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7
   * Job ID: ca98366cc7314957b8c012c72f05aeeb
   * Fee: 0.1 LINK
   */
  constructor(
    address _oracle,
    bytes32 _jobId,
    uint256 _fee,
    address _link
  ) {
    if (_link == address(0)) {
      setPublicChainlinkToken();
    } else {
      setChainlinkToken(_link);
    }
    oracle = _oracle;
    jobId = _jobId;
    fee = _fee;
  }

  /**
   * Create a Chainlink request to retrieve API response, find the target
   * data.
   */
  function RequestStatusData() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      jobId,
      address(this),
      this.fulfill.selector
    );

    // Set the URL to perform the GET request on
    req.add("get", "https://onlyhuman.vercel.app/api/...");

    req.add("path", "status, approved"); // Chainlink nodes 1.0.0 and later support this format

    // Sends the request
    return sendChainlinkRequestTo(oracle, req, fee);
  }

  /**
   * Receive the response in the form of uint256
   */
  function fulfill(bytes32 _requestId, uint256 _status)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit RequestStatus(_requestId, _status);
    status = _status;
  }

  /**
   * Allow withdraw of Link tokens from the contract
   */
  function withdrawLink() public view onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    // require(
    //     link.transfer(msg.sender, link.balanceOf(address(this))),
    //     "Unable to transfer"
    // );
  }
}
