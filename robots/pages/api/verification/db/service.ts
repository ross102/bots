import { Deta } from "deta";
import { IcreateInquiry } from "../../../../components/utils/types";

const deta = Deta(process.env.DETA_PROJECT_KEY);

const base = deta.Base("humanDB");

export async function createEntry(userData: IcreateInquiry) {
  const { referenceId } = userData;
  await base.put(userData, referenceId.toLowerCase());
}

export async function getEntry(referenceId: string) {
  try {
    return await base.get(referenceId.toLowerCase());
  } catch (error) {
    console.log(error);
  }
}

export async function getAll() {
  return base.fetch([]);
}
