// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title The APIConsumer contract
 * @notice An API Consumer contract that makes GET requests to obtain 24h trading volume of ETH in USD
 */
contract APIConsumer is ChainlinkClient, Ownable {
  using Chainlink for Chainlink.Request;

  address private immutable oracle;
  bytes32 private immutable jobId;
  uint256 private immutable fee;
  string private path;
  string private endpoint;

  mapping(bytes32 => address) private s_RequestIdToUser;
  mapping(address => string) s_UserToVerificationStatus;

  event DataFullfilled(string status);

  /**
   * @notice Executes once when a contract is created to initialize state variables
   *
   * @param _oracle - address of the specific Chainlink node that a contract makes an API call from
   * @param _jobId - specific job for :_oracle: to run; each job is unique and returns different types of data
   * @param _fee - node operator price per API call / data request
   * @param _link - LINK token address on the corresponding network
   *
   * * Goerli Testnet details:
   * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
   * Oracle: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 (Chainlink DevRel)
   * jobId: 7d80a6386ef543a3abb52817f6707e3b (string)
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
   * @notice gets an adresses verification status.
   * @return bytes32, the verification status (pending, approved, complete. etc)
   */
  function getVerificationStatus(address _user)
    external
    view
    returns (string memory)
  {
    return s_UserToVerificationStatus[_user];
  }

  /**
   * @notice sets the chainlink params, can be updated anytime if the endpoint changes
   */
  function setQueryParams(string memory _path, string memory _endpoint)
    public
    onlyOwner
  {
    path = _path;
    endpoint = _endpoint;
  }

  /**
   * @notice Creates a Chainlink request to retrieve API response, find the target
   * data.
   *
   * @return requestId - id of the request
   */
  function requestHumanStatus() public returns (bytes32 requestId) {
    Chainlink.Request memory request = buildChainlinkRequest(
      jobId,
      address(this),
      this.fulfill.selector
    );
    // Set the URL to perform the GET request on
    request.add("get", string(abi.encodePacked(endpoint, msg.sender)));
    // Chainlink nodes prior to 1.0.0 support this format
    request.add("path", path); // Chainlink nodes 1.0.0 and later support this format
    s_RequestIdToUser[requestId] = msg.sender;
    // Sends the request
    return sendChainlinkRequestTo(oracle, request, fee);
  }

  /**
   * @notice Receives the response in the form of bytes32
   *
   * @param _requestId - id of the request
   * @param _status - response; requested verification status
   */
  function fulfill(bytes32 _requestId, string memory _status)
    public
    recordChainlinkFulfillment(_requestId)
  {
    s_UserToVerificationStatus[s_RequestIdToUser[_requestId]] = _status;
    emit DataFullfilled(_status);
  }

  /**
   * @notice Witdraws LINK from the contract
   * @dev Implement a withdraw function to avoid locking your LINK in the contract
   */
  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(
      link.transfer(msg.sender, link.balanceOf(address(this))),
      "Unable to transfer"
    );
  }
}
