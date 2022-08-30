import type { NextApiRequest, NextApiResponse } from "next";
import { createEntry } from "./db/service";

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
<<<<<<< HEAD
    await Areyouhuman.createInquiry(userData);
=======
    await createEntry(userData);
>>>>>>> 0e3fef35cfac912aae43f088cccdeaf8bb9be6b7
    res.status(200).json({ message: "success", user: userData });
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}
