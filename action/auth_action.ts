"use server";
import { parseStringify } from "@/helper/other";
import { postData } from "./api_fetch";
import { z } from "zod";
import { createAccountSchema } from "@/types";
export const createUserAccount = async (
  data: z.infer<typeof createAccountSchema>
) => {
  try {
    const res = await postData("auth/create-account", JSON.stringify(data));

    return parseStringify(res);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
