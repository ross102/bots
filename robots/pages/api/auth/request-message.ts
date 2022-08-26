import Moralis from "moralis";
import type { NextApiRequest, NextApiResponse } from "next";

const future = new Date();
future.setDate(future.getDate() + 30);

const statement = "Please sign this message to confirm your identity.";
const timeout = 60;
const expiration_time = future.toISOString();

declare let process: {
  env: {
    APP_DOMAIN: string;
    NEXTAUTH_URL: string;
    MORALIS_API_KEY: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, chain, network } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      domain: process.env.APP_DOMAIN,
      statement: statement,
      uri: process.env.NEXTAUTH_URL,
      expirationTime: expiration_time,
      timeout: timeout,
    });

    res.status(200).json(message);
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}
