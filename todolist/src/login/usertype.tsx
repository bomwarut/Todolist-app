import * as z from "zod";

export type UserState = {
  email: string;
  password: string;
};

export const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[a-z]/, "At least one lowercase letter")
    .regex(/[0-9]/, "At least one digit")
    .regex(/[@#$%^&*!]/, "At least one special character (@#$%^&*)"),
});

export type FormData = z.infer<typeof schema>;