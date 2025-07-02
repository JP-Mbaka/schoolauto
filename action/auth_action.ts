"use server";
import { parseStringify } from "@/helper/other";
import { getData, postData } from "./api_fetch";
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

export const getAllUserAccounts = async () => {
  console.log("Execution started in getAll User Accounts");
  try {
    const res = await getData(
      "/auth/users?page=1&limit=10&role=STUDENT",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NTc0YmFmZC01YTAyLTQ3Y2YtOTQ4Yy1mMWIyMjI3MjQ0MDYiLCJlbWFpbCI6ImVjZWxpbmVhbWFyYWNoaUB5YWhvby5jb20iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJzdGF0dXMiOiJhY3RpdmUiLCJpYXQiOjE3NTE0NDk2NjUsImV4cCI6MTc1MjA1MjgwOH0.tHdEkPBOfW8ZWUPzfkG8AuomDybEuHN62RsQtEYbmFk"
    );

    console.log(
      "Execution started in getAll User Accounts:   " + res["data"]["users"]
    );
    return parseStringify(res["data"]["users"]);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
