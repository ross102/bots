import Areyouhuman from "../../../components/utils/services";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referenceId } = req.query;

  try {
    const resp = await Areyouhuman.getStatus(referenceId);
    res.status(200).json({ status: resp });
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}
