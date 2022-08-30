import Areyouhuman from "../../../components/utils/services";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referenceId } = req.query;
  const resp = await Areyouhuman.getStatus(referenceId);
  if (!resp) {
    res.status(404).json({ status: "not found" });
  }

  let inquiryId;
  try {
    if (resp) {
      inquiryId = await Areyouhuman.checkPersona(resp);
      res.status(200).json({ status: inquiryId });
    }
  } catch (error: any) {
    console.log(error.response);
  }
}
