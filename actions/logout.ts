// actions/logout.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // Clear the session cookie
  (
    await // Clear the session cookie
    cookies()
  ).delete("next-auth.session-token");

  // Redirect to login
  redirect("/login");
}
