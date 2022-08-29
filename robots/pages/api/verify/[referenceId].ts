import Areyouhuman from "../../../components/utils/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referenceId } = req.query;

  try {
    // inq_qUanym8FNvPvKtc9Bwc3ECVD
    // const inquiryId = await Areyouhuman.getStatus(referenceId);
    const status = await getInquiryStatus("inq_qUanym8FNvPvKtc9Bwc3ECVD"); // pass inquiry id here
    res.status(200).json({ status });
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
