import { z } from "zod";

export interface createAccountResponse {
  success: boolean;
  data: {
    message: string;
    user: {
      user_uuid: string;
      email: string;
      role: string;
      status: string;
      first_name: string;
      last_name: string;
      phone: unknown;
      profile_picture: unknown;
      student_id: string;
      teacher_id: number;
      email_verified: boolean;
      last_login: unknown;
      created_by: string;
      updated_by: string;
      created_at: string;
      updated_at: string;
    };
    activation_token: string;
  };
}

export const createAccountSchema = z.object({
  email: z.string(),
  role: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  student_id: z.string().optional(),
  teacher_id: z.number().optional(),
});
