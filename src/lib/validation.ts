import * as z from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .and(
        z.string().regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
      )
      .and(
        z.string().regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
      )
      .and(
        z.string().regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
      ),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
        fatal: true,
      });
    }
  });

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const CreateBookSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(150, "Title must be less than 150 characters"),
});

export const AddSectionSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(150, "Title must be less than 150 characters"),
  content: z
    .string({ required_error: "Content is required" })
    .max(1500, "Content must be less than 1500 characters")
    .optional(),
});
