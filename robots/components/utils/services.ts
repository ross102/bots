import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import type { IcreateInquiry } from "./types";
import process from "./types";

class AreyouHuman {
  db: JsonDB;
  constructor() {
    this.db = new JsonDB(
      new Config("../../db/verifiedDatabase.json", true, true, "/")
    );
  }

  async createInquiry(userData: IcreateInquiry) {
    const { referenceId } = userData;
    await this.db.push(`/${referenceId}/verify`, userData);
    return this.db.save();
  }

  async getInquiryId(referenceId: string | string[] | undefined) {
    const data = await this.db.getData(`/${referenceId}/verify`);
    const { inquiryId } = data;
    return inquiryId;
  }

  async getAll() {
    const data = await this.db.getData(`/`);
    return data;
  }

  async getInquiryStatus(inquiryId: string) {
    return await fetch(
      `https://withpersona.com/api/v1/inquiries/${inquiryId}`,
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
  }
}

export default new AreyouHuman();
