import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network, run } from "hardhat";
import { autoFundCheck, verify } from "../helper-functions";
import { BigNumber } from "ethers";

const deployAPIConsumer: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  const linkTokenAddress: string = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const oracle: string = "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7";
  const jobId = ethers.utils.toUtf8Bytes("7da2702f37fd48e5b1b9a5715e3509b6");
  const fee: string = "100000000000000000";
  const fundAmount: BigNumber = BigNumber.from("1000000000000000000");

  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);
  log("deploying APIConsumer contract");

  const args = [oracle, jobId, fee, linkTokenAddress];
  const apiConsumer = await deploy("APIConsumer", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 6,
  });

  log("deployed APIConsumer contract contract at " + apiConsumer.address);

  if (process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(apiConsumer.address, args);
  }

  // Checking for funding...
  if (fundAmount && fundAmount.gt(ethers.constants.Zero)) {
    log("Funding with LINK...");
    if (
      await autoFundCheck(apiConsumer.address, network.name, linkTokenAddress!)
    ) {
      await run("fund-link", {
        contract: apiConsumer.address,
        linkaddress: linkTokenAddress,
      });
    } else {
      log("Contract already has LINK!");
    }
  }

  log("----------------------------------------------------");
  log("Done!");
};

export default deployAPIConsumer;
deployAPIConsumer.tags = ["all", "api", "main"];
