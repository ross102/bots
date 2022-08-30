import type { NextApiRequest, NextApiResponse } from "next";
import { getEntry } from "../verification/db/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referenceId } = req.query;

  try {
    const entry = await getEntry(referenceId as string);
    if (entry) {
      const status = await getInquiryStatus(entry?.inquiryId as string);
      res.status(200).json({ status });
    } else {
      res.status(404).json({ status: "Path Not Found" });
    }
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}

const getInquiryStatus = async (inquiryId: string) =>
  await fetch(`https://withpersona.com/api/v1/inquiries/${inquiryId}`, {
    headers: {
      Accept: "application/json",
      "Persona-Version": "2021-07-05",
      Authorization: `Bearer ${process.env.PERSONA_API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.errors) {
        return response.errors[0].title;
      } else {
        return response.data.attributes.status;
      }
    })
    .catch((err) => {
      console.log(err);
    });
