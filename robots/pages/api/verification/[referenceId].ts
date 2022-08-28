import db from "../../../components/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referenceId } = req.query;

  try {
    const data = await db.getData(`/${referenceId}/verify`);

    res.status(200).json(data);
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}
