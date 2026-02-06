// app/api/upload/route.ts
import { writeFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file || !(file instanceof File)) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return Response.json({ error: "File too large" }, { status: 400 });
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return Response.json({ error: "Invalid file type" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${nanoid()}.${ext}`;
    const filepath = join(process.cwd(), "public", "uploads", filename);

    await writeFile(filepath, buffer);

    return Response.json({
      url: `/uploads/${filename}`,
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
