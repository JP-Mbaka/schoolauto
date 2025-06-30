import { parseStringify } from "@/helper/other";
import { postData } from "./api_fetch";

export const createUserAccount = async () => {
  try {
    const res = await postData("auth/create-account", {});

    return parseStringify(res);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
