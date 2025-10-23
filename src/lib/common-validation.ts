import z from "zod";

export const passwordValidation = z.string();
// .min(8, "Password must be at least 8 characters")
// .regex(/[0-9]/, "Password must contain at least one number")
// .regex(
//   /[!@#$%^&*(),.?":{}|<>]/,
//   "Password must contain at least one special character"
// );
