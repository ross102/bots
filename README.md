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
 You can check an already deployed contract at https://goerli.etherscan.io/address/0x9Eb6dd0D51522a6aece199B77c431995e58697eB 
  
 Calling the contract method requestHumaStatus() initiates a chainlink request. And a request is sent to the API endpoint specified 
  
 Call s_usertoverificationstatus() this returns the verification status. (Approved, completed, pending, rejected etc) 
  
 ## To verify your identity, 
  
 ```shell 
 Cd robots 
 Yarn dev 
 ``` 
  
 Visit localhost:3000 to verify your identity with persona. 
  
 1. Connect with your wallet 
 2. Authenticate with moralis+ nextjs Auth and sign your signature 
 3. After login you can be able to access the persona flow 
 4. Fill in the required details and click submit. 
 5. Wait for your verification to be approved.

You can visit http://areyouhuman-ross102.vercel.app/ to try out the persona verification flow.

Check out the a testnet implementation of onlyHuman modifier at https://goerli.etherscan.io/address/0xE0880410C46b646eD9b9D755d11990212B9af934

Read through our products pitch here https://www.canva.com/design/DAFKivBVh2k/1kJqVBc8i8I-7_rFCKVl2A/view?utm_content=DAFKivBVh2k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
