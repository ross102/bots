import axios from "axios";
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
      res.status(404).json({ error: "Path Not Found" });
    }
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error: `400 ${error}` });
  }
}

const getInquiryStatus = async (inquiryId: string) =>
  await axios
    .get(`https://withpersona.com/api/v1/inquiries/${inquiryId}`, {
      headers: {
        Accept: "application/json",
        "Persona-Version": "2021-07-05",
        Authorization: `Bearer ${process.env.PERSONA_API_KEY}`,
      },
    })
    .then((response) => response.data)
    .then((response) => {
      if (response.errors) {
        return response.errors[0].title;
      } else if (response.data) {
        return response.data.attributes.status;
      }
    })
    .catch((error) => {
      console.log(error);
      return { err: "call to persona failed" };
    });
