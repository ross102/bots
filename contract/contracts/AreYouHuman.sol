// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 * Run your own chainlink Node and deploy an operator contract: https://docs.chain.link/docs/running-a-chainlink-node/
 */

contract AreYouHuman is ChainlinkClient, Ownable {
  using Chainlink for Chainlink.Request;

  // var jobId: external job id of a chainlink node
  bytes32 private immutable jobId;
  // var fee: 0.1 link, required to call the operator contract
  uint256 private immutable fee;

  // var path: path to data requested from an api
  // see https://jsonpath.com/
  string private path;
  // var baseApi: api base url. eg (https://chain.link/api/data/)
  string private baseApi;

  // mapping s_RequestIdToUser: maps the requestId to the user making the request
  mapping(bytes32 => address) private s_RequestIdToUser;
  // mapping s_UserToVerificationStatus: stores the user's status after making a request
  mapping(address => string) public s_UserToVerificationStatus;

  event StatusFufilled(bytes32 indexed requestId, string status);

  /**
   * @notice Executes once when a contract is created to initialize state variables
   * @param _job_Id - specific job for :_operator: to run; each job is unique and returns different types of data
   * @param _operator - address of the specific Chainlink node that a contract makes an API call from
   * @param _fee - node operator price per API call / data request
   * @param _link_Token - LINK token address on the corresponding network
   */
  constructor(
    bytes32 _job_Id,
    address _operator,
    uint256 _fee,
    address _link_Token
  ) {
    setChainlinkToken(_link_Token);
    setChainlinkOracle(_operator);
    jobId = _job_Id;
    fee = _fee;
  }

  /**
   * @notice sets the chainlink request parameters
   * @param _path - the path to walk when an api call is made
   * @param _baseApi - Set the base URL to perform the GET request on
   */
  function setQueryParams(string memory _path, string memory _baseApi)
    public
    onlyOwner
  {
    path = _path;
    baseApi = _baseApi;
  }

  /**
   * @notice Create a Chainlink request to retrieve API response, and find the target (status).
   * @return requestId - unique request identifier
   */
  function requestHumanityStatus() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      jobId,
      address(this),
      this.fulfillHumanityStatus.selector
    );
    req.add("get", getEndpoint(msg.sender));
    req.add("path", path);
    s_RequestIdToUser[requestId] = msg.sender;
    return sendOperatorRequest(req, fee);
  }

  /**
   * Receive the response in the form of a string
   */
  function fulfillHumanityStatus(bytes32 _requestId, string memory _status)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit StatusFufilled(_requestId, _status);
    // sets the user verification status (approved, declined, pending ...)
    s_UserToVerificationStatus[s_RequestIdToUser[_requestId]] = _status;
  }

  /**
   * get the users verification status (approved, declined, pending ...)
   * @param _user - the user to retrieve verification status for.
   */
  function getVerificationStatus(address _user)
    external
    view
    returns (string memory)
  {
    return s_UserToVerificationStatus[_user];
  }

  /**
   * @notice coverts caller address (msg.sender) to string and concatenates it with the baseApi
   * @param _sender - msg.sender
   * @return (endpoint) - the URL to which the API call is made
   */
  function getEndpoint(address _sender) internal view returns (string memory) {
    string memory addrToStr = Strings.toHexString(
      uint256(uint160(_sender)),
      20
    );
    return string(abi.encodePacked(baseApi, addrToStr));
  }

  /**
   * Allow the withdrawal of Link tokens from the contract
   */
  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(
      link.transfer(msg.sender, link.balanceOf(address(this))),
      "Unable to transfer"
    );
  }
}
