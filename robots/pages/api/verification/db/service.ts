import { JsonDB, Config } from "node-json-db";
import { IcreateInquiry } from "../../../../components/utils/types";

const DB_PATH: string = "../../db/verifiedDatabase.json";

let db = new JsonDB(new Config(DB_PATH, true, false, "/"));

export async function createEntry(userData: IcreateInquiry) {
  const { referenceId } = userData;
  db.push(`/${referenceId}/verify`, userData);
}

export async function getEntry(referenceId: string) {
  try {
    return db.getObject<IcreateInquiry>(`/${referenceId}/verify`);
  } catch (error) {
    console.log(error);
  }
}

export async function getAll() {
  return db.getData("/");
}
