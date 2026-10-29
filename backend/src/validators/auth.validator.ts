import { z } from "zod";
import bcrypt from "bcryptjs";


const passwordSchema = z.string().max(128).refine((val) => !bcrypt.truncates(val), {
    message: "Password must not exceed 72 UTF-8 bytes",
})
export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().email().max(254),
        password: passwordSchema.min(1),
    }),
});
export const registerSchema = z.object({
    body: z.object({
        email: z.string().trim().email().max(254),
        password: passwordSchema.min(15, "Password must be at least 15 characters long"),
        country: z.string().optional(),
    }),
});
export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];