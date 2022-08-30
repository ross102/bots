import Areyouhuman from "../../../components/utils/services";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referenceId } = req.query;

  try {
    const InquiryId = await Areyouhuman.getInquiryId(referenceId);
    res.status(200).json({ status: InquiryId });
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}
