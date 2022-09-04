import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network, run } from "hardhat";
import { autoFundCheck, verify } from "../helper-functions";
import { BigNumber } from "ethers";

const deployAreYouHuman: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  const linkTokenAddress: string = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const operator: string = "0x1F4aA12370490C7cd4570cd08B1be419e507C9D1";
  const jobId = ethers.utils.toUtf8Bytes("2983e6e5b842406c9bb05d82c8afc30d");
  const fee: string = "100000000000000000";
  const fundAmount: BigNumber = BigNumber.from("1000000000000000000");

  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);
  log("deploying AreYouHuman contract");

  const args = [jobId, operator, fee, linkTokenAddress];
  const AreYouHuman = await deploy("AreYouHuman", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 6,
  });

  log("deployed AreYouHuman contract contract at " + AreYouHuman.address);

  if (process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(AreYouHuman.address, args);
  }

  // Checking for funding...
  if (fundAmount && fundAmount.gt(ethers.constants.Zero)) {
    log("Funding with LINK...");
    if (
      await autoFundCheck(AreYouHuman.address, network.name, linkTokenAddress!)
    ) {
      await run("fund-link", {
        contract: AreYouHuman.address,
        linkaddress: linkTokenAddress,
      });
    } else {
      log("Contract already has LINK!");
    }
  }

  log("----------------------------------------------------");
  log("Done!");
};

export default deployAreYouHuman;
deployAreYouHuman.tags = ["all", "api", "main"];
