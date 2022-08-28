import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { verify } from "../helper-functions";

const deployTest: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  log("deploying Test");
  const receipt = await deploy("Test", {
    from: deployer,
    args: [],
    log: true,
  });
  log("deployed Test contract at " + receipt.address);

  if (process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(receipt.address, []);
  }
};
export default deployTest;
deployTest.tags = ["all", "test"];
