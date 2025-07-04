import { z } from "zod";

export const authType = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const changePassType = z.object({
  currentPassword: z.string().min(1).max(8),
  newPassword: z.string().min(1).max(8),
  confirmPassword: z.string().min(1).max(8),
});

export const updateProfileType = z.object({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
});
