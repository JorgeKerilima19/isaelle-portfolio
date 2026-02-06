// lib/projects.ts
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

export async function uploadImage(file: File): Promise<string | null> {
  if (!file || !(file instanceof File) || file.size === 0) {
    return null;
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

    if (!validExtensions.includes(ext)) {
      throw new Error("Invalid image format");
    }

    const filename = `${nanoid()}.${ext}`;
    const filepath = join(process.cwd(), "public", "uploads", filename);

    await writeFile(filepath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
}
