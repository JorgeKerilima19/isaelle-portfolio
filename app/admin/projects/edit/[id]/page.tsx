// app/admin/projects/edit/[id]/page.tsx
import prisma from "@/lib/prisma";
import EditProjectClient from "./EditProjectClient";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Correctly await params
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id }, // ✅ Use the awaited id
  });

  if (!project) {
    return <div className="max-w-4xl mx-auto p-8">Proyecto no encontrado</div>;
  }

  return <EditProjectClient project={project} />;
}
