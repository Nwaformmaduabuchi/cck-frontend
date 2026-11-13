import * as z from "zod"

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Full name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .pipe(z.email({error:"Please enter a valid email address"})),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  })

export type SignupFormValues = z.infer<typeof signupSchema>


export const loginSchema = z.object({
 email: z
  .string()
  .min(1, "Email is required")
  .pipe(z.email({error:"Please enter a valid email address"})),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(128, "Password cannot exceed 128 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number is too short"),

  location: z
    .string()
    .min(2, "Location is required"),

  logo: z
    .instanceof(File)
    .optional()
    .nullable()
});


export type CompanyFormValues = z.infer<typeof companySchema>;