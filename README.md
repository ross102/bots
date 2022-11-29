# onlyHuman  
  
 This project demonstrates  the use of chainlink oracles to introduce kYC check at smart-contract level.  
 onlyHuman is a smart-contract modifier that requires the msg.sender to have completed the kYC on persona identity. 
 Contract methods with onlyHuman modifier will revert if the caller has not passed kYC. 
  
 This project uses chainlink any API, moralis Auth and persona identity solutions. 
  
 First 
 Set your environment variables 

 - ETHERSCAN_API_KEY=secret 
 - PRIVATE_KEY=secret 
 - REPORT_GAS= Boolean (true/false) 
 - GOERLI_URL=RPC endpoint  
  
 ## Deploy your contracts 
 You need to ensure that you have the correct jobid and oracle address 
 Refer to this https://documentation-woad-five.vercel.app/docs/any-api/testnet-oracles/ 
  
 ```shell 
 git clone ... 
 Yarn install 
 Cd contracts 
 Yarn hardhat compile 
 Yarn hardhat deploy --networ goerli 
 Yarn hardhat run scripts/setQeueryParams --network goerli  
 ``` 
Please switch to branch **contract** to view the actual code
 You can check an already deployed contract at https://goerli.etherscan.io/address/0xf3ee05925Ffcd122930C870d7c0FB5E9cc86F489 
  
 Calling the contract method requestHumaStatus() initiates a chainlink request. And a request is sent to the API endpoint specified 
  
 Call s_usertoverificationstatus() this returns the verification status. (Approved, completed, pending, rejected etc) 

## To verify your identity 

You can visit our website at <a href="https://areyouhuman.netlify.app">Areyouhuman website</a> to get verified with persona

<ul>  
  <li> Connect with your wallet </li> 
  <li> Authenticate with moralis+ nextjs Auth and sign your signature </li> 
 <li> After login you can be able to access the persona flow </li>
 <li> Fill in the required details and click submit. </li>
 <li> Wait for your verification to be approved and click done.  </li>
</ul>

To run the project locally:

 ```shell 
 Cd robots directory 
 yarn dev
 ``` 
 
 Visit localhost:3000 to verify your identity with persona. 

## Testnet

Check out the a testnet implementation of onlyHuman modifier at https://goerli.etherscan.io/address/0x56e2809A758aA602865cfa0b676b96EF6F57Bd68


