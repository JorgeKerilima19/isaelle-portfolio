// actions/translations.ts
'use server'

import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

export async function createTranslation(
  prevState: string | null,
  formData: FormData
) {
  const sessionToken = (await cookies()).get("next-auth.session-token")?.value
  if (!sessionToken) throw new Error("unauthorized")
  
  const { payload } = await jwtVerify(sessionToken, secret)
  if (payload.role !== "admin") throw new Error("unauthorized")

  const sourceProjectId = formData.get("sourceProjectId") as string
  const targetLocale = formData.get("targetLocale") as string

  if (!sourceProjectId || !targetLocale) {
    return "missing_fields"
  }

  const sourceProject = await prisma.project.findUnique({
    where: { id: sourceProjectId }
  })

  if (!sourceProject) {
    return "source_not_found"
  }

  // Check if translation already exists
  const existingTranslation = await prisma.project.findFirst({
    where: {
      slug: sourceProject.slug,
      locale: targetLocale
    }
  })

  let translationId: string

  if (existingTranslation) {
    translationId = existingTranslation.id
  } else {
    const translationLink = `/${targetLocale}/proyectos/${sourceProject.slug}`
    
    const translation = await prisma.project.create({
       data:{
        title: `${sourceProject.title} (${targetLocale.toUpperCase()})`,
        excerpt: sourceProject.excerpt,
        content: '<p>Contenido pendiente de traducción...</p>',
        locale: targetLocale,
        year: sourceProject.year,
        published: false,
        imageUrl: sourceProject.imageUrl,
        slug: sourceProject.slug,
        link: translationLink,
        authorId: payload.sub as string,
        sourceProjectId: sourceProject.id
      }
    })

    await prisma.project.update({
      where: { id: sourceProject.id },
      data: { 
        translations: { 
          connect: { id: translation.id } 
        } 
      }
    })

    translationId = translation.id
  }

  redirect(`/admin/projects/edit/${translationId}`)
}