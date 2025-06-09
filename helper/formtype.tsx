import { z } from "zod";

export const authType = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
