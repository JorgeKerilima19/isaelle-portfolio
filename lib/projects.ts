// lib/projects.ts
import prisma from "@/lib/prisma"
import { writeFile } from "fs/promises"
import { join } from "path"
import { nanoid } from "nanoid"
import { createProjectWithTranslations } from "./translations"

export async function uploadImage(file: File): Promise<string | null> {
  if (!file || !(file instanceof File) || file.size === 0) {
    return null
  }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    
    if (!validExtensions.includes(ext)) {
      throw new Error('Invalid image format')
    }
    
    const filename = `${nanoid()}.${ext}`
    const filepath = join(process.cwd(), 'public', 'uploads', filename)
    
    await writeFile(filepath, buffer)
    return `/uploads/${filename}`
  } catch (error) {
    console.error('Image upload error:', error)
    return null
  }
}

export async function createProjectWithFiles(
  mainData: {
    title: string
    excerpt: string
    content: string
    locale: string
    year?: number
    published: boolean
    authorId: string
  },
  translationData?: {
    title: string
    excerpt: string
    content: string
    locale: string
    year?: number
  },
  mainImageFile?: File,
  translationImageFile?: File
) {
  // Upload images
  const mainImageUrl = await uploadImage(mainImageFile as File)
  const translationImageUrl = await uploadImage(translationImageFile as File)

  // Prepare data with image URLs
  const mainProjectData = {
    ...mainData,
    imageUrl: mainImageUrl
  }

  const translationProjectData = translationData ? {
    ...translationData,
    imageUrl: translationImageUrl
  } : undefined

  return createProjectWithTranslations(mainProjectData, translationProjectData)
}