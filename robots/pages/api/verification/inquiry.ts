import db from "../../../components/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, referenceId, inquiryId, status, profileId } = req.body;

  const userData = {
    id,
    referenceId,
    inquiryId,
    status,
    profileId,
  };

  try {
    await db.push(`/${referenceId}/verify`, userData);

    res.status(200).json({ message: "success", user: userData });
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}
