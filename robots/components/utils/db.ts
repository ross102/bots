import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
const db = new JsonDB(
  new Config("../../db/verifiedDatabase.json", true, true, "/")
);

export default db;
