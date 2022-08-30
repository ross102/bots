import process from "../../../../components/utils/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // verify from persona
    const resp = await getInquiryStatus("inq_UQTWeWSmpMbw33e1nnyaQhAb");
    if (!resp) {
      return res.status(404).json({ error: "not found" });
    }
    let data = resp.data.attributes.status;
    res.status(200).json({ status: data });
  } catch (error: any) {
    console.log(error.response);
    res.status(400).json({ error });
  }
}

const getInquiryStatus = async (inquiryId: string) => {
  return fetch(
    `https://withpersona.com/api/v1/inquiries/inq_UQTWeWSmpMbw33e1nnyaQhAb`,
    {
      headers: {
        Accept: "application/json",
        "Persona-Version": "2021-07-05",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  )
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
};
