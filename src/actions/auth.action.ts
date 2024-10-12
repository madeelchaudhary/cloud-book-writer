"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { signIn as authSignIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { RegisterSchema } from "@/lib/validation";

export const registerUser = async (payload: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate user data using Zod
    const validationResult = RegisterSchema.safeParse(payload);

    if (!validationResult.success) {
      return {
        status: "error",
      };
    }

    const user = validationResult.data;

    // Check if user already exists in database
    const userExists = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (userExists) {
      return {
        status: "error",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      ...user,
      confirmPassword: undefined,
      password: hashedPassword,
    };

    // Create user in database
    await prisma.user.create({ data: newUser });

    return {
      status: "success",
      message: "You have successfully signed up. Please sign in.",
    };
  } catch (error) {
    // Handle signup errors
    console.error(error);
    return {
      status: "error",
      error: "An error occurred while signing up. Please try again.",
    };
  }
};

export const signIn = authSignIn;
