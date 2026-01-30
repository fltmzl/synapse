import z from "zod";

export const userSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Name is required" }),
  role: z.enum(["superadmin", "regular_user", "paid_user"]),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  countryCode: z.string().min(1, { message: "Country code is required" }),
  password: z.string().min(1, { message: "Password is required" })
});
