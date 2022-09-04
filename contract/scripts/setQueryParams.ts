import { Contract, ethers } from "ethers";
import { deployments, getNamedAccounts } from "hardhat";
import { AreYouHuman } from "../typechain-types";

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
  const consumerAddress = await (await deployments.get("AreYouHuman")).address;
  const consumerInterface = await (await deployments.get("AreYouHuman")).abi;

  console.log(
    `Attaching AreYouHuman contract interface to address ${consumerAddress}`
  );

  const consumerContract: AreYouHuman = new Contract(
    consumerAddress,
    consumerInterface,
    signer
  ) as AreYouHuman;

  console.log(`seting params from ${deployer}`);
  const tx = await consumerContract.setQueryParams(
    "status",
    "https://areyouhuman.netlify.app/api/verify/"
  );
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
