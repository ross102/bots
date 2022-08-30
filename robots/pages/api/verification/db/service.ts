import { Deta } from "deta";
import { IcreateInquiry } from "../../../../components/utils/types";

const deta = Deta(process.env.DETA_PROJECT_KEY);

const base = deta.Base("humanDB");

export async function createEntry(userData: IcreateInquiry) {
  const { referenceId } = userData;
  await base.put(userData, referenceId);
}

export async function getEntry(referenceId: string) {
  try {
    return await base.get(referenceId);
  } catch (error) {
    console.log(error);
  }
}

export async function getAll() {
  return base.fetch([]);
}
