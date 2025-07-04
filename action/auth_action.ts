"use server";
import { parseStringify } from "@/helper/other";
import { getData, postData } from "./api_fetch";
import { z } from "zod";
import { createAccountSchema } from "@/types";
import { authType, changePassType } from "@/helper/formtype";

export const createUserAccount = async (
  data: z.infer<typeof createAccountSchema>
) => {
  try {
    const res = await postData("auth/create-account", data);

    return parseStringify(res);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const loginAccount = async (data: z.infer<typeof authType>) => {
  try {
    const res = await postData("auth/login", data);

    return parseStringify(res);
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}`
    );
    console.log(error);
  }
};
export const changePass = async (data: z.infer<typeof changePassType>) => {
  try {
    const res = await postData("auth/change-password", {
      current_password: data.currentPassword,
      new_password: data.newPassword,
    });

    return parseStringify(res);
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}`
    );
    console.log(error);
  }
};

export const getAllUserAccounts = async () => {
  console.log("Execution started in getAll User Accounts");
  try {
    const res = await getData("/auth/users?page=1&limit=10&role=STUDENT");

    console.log(
      "Execution started in getAll User Accounts:   " + res["data"]["users"]
    );
    return parseStringify(res["data"]["users"]);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
