# onlyHuman 

This project demonstrates  how to use chainlink oracles to introduce kYC check at smart-contract level. 
onlyHuman is a smart-contract modifier that requires the msg.sender to have completed the kYC on persona identity.
Contract method with onlyHuman modifier will revert if the caller has not passed kYC.

This project uses chainlink any API and persona identity solution.

First
Set your environment variables
- ETHERSCAN_API_KEY= secret
- PRIVATE_KEY= secret
- REPORT_GAS= Boolean (true/false)
- GOERLI_URL=RPC endpoint 

## Deploy your contracts
You need to ensure that you have the correct jobid and oracle address
Refer to this https://documentation-woad-five.vercel.app/docs/any-api/testnet-oracles/

```shell
git clone ...
Yarn install
Cd contracts
Yarn hardhat compile
Yarn hardhat deploy --networ goerli
Yarn hardhat run scripts/setQeueryParams --network goerli 
```
To verify your identity,
```shell
Cd robots
Yarn dev
```

Visit localhost:3000 to verify your identity with persona.
