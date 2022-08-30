import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import type { IcreateInquiry } from "./types";
import baseApi from "./baseApi";

class AreyouHuman {
  db: JsonDB;
  constructor() {
    this.db = new JsonDB(
      new Config("../../db/verifiedDatabase.json", true, true, "/")
    );
  }

  async createInquiry(userData: IcreateInquiry) {
    const { referenceId } = userData;
    return await this.db.push(`/${referenceId}/verify`, userData);
  }

  async getStatus(referenceId: string | string[] | undefined) {
    const data = await this.db.getData(`/${referenceId}/verify`);
    const { inquiryId } = data;
    return inquiryId;
  }

  async getAll() {
    const data = await this.db.getData(`/`);
    return data;
  }

  async checkPersona(inquiryId: string | string[] | undefined) {
    return await baseApi.get(`/api/verification/persona/` + inquiryId, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
  }
}

export default new AreyouHuman();
