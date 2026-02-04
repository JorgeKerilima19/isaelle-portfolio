// actions/register.ts
"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate inputs
    if (!email || !name || !password || !confirmPassword) {
      return "missing_fields";
    }

    if (password !== confirmPassword) {
      return "password_mismatch";
    }

    if (password.length < 8) {
      return "password_too_short";
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return "user_exists";
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user as ADMIN (since it's your CMS)
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "admin",
      },
    });

    return "success";
  } catch (error) {
    console.error("Registration error:", error);
    return "unknown_error";
  }
}
