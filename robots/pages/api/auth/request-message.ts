import Moralis from "moralis";
import process from "../../../components/utils/types";
import db from "../../../components/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

const future = new Date();
future.setDate(future.getDate() + 30);

const statement = "Please sign this message to confirm your identity.";
const timeout = 60;
const expiration_time = future.toISOString();

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
