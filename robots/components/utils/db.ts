import { JsonDB, Config } from "node-json-db";
const db = new JsonDB(
  new Config("../../db/verifiedDataBase.json", true, true, "/")
);

export default db;
