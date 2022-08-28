import Areyouhuman from "../../../../components/utils/services";
//import persona from "../../../components/utils/persona";
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { inquiryId } = req.query;

  try {
    // verify from persona
    const resp = await Areyouhuman.checkPersona(inquiryId);
    let data = resp.data.attributes.status;
    res.status(200).json({ status: data });
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}
