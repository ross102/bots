import { Contract, ethers } from "ethers";
import { deployments, getNamedAccounts } from "hardhat";
import { APIConsumer } from "../typechain-types";

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("goerli");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  const { deployer } = await getNamedAccounts();
  const consumerAddress = await (await deployments.get("APIConsumer")).address;
  const consumerInterface = await (await deployments.get("APIConsumer")).abi;

  console.log(
    `Attaching APIConsumer contract interface to address ${consumerAddress}`
  );

  const ballotContract: APIConsumer = new Contract(
    consumerAddress,
    consumerInterface,
    signer
  ) as APIConsumer;

  console.log(`casting vote to ballot from ${deployer}`);
  const tx = await ballotContract.setQueryParams(
    "0,id",
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10"
  );
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
