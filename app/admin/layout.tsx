// app/admin/layout.tsx
"use client";

import { logout } from "@/actions/logout";
import Link from "next/link";
import { useFormState } from "react-dom";

function LogoutButton() {
  const [_, formAction] = useFormState(logout, undefined);

  return (
    <form action={formAction} className="ml-auto">
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-[1.5rem] transition-colors"
      >
        Cerrar Sesión
      </button>
    </form>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-4 flex items-center">
        <nav className="mt-6 space-y-2 text-[1.4rem] flex gap-2">
          <Link
            href="/admin/projects"
            className="block px-4 py-2 text-gray-200 hover:bg-gray-200 rounded hover:text-gray-950"
          >
            Proyectos
          </Link>
          <Link
            href="/admin/blogs"
            className="block px-4 py-2 text-gray-200 hover:bg-gray-200 rounded hover:text-gray-950"
          >
            Blogs
          </Link>
        </nav>
        <LogoutButton />
      </header>
      <main className="p-6 text-[1.4rem]">{children}</main>
    </div>
  );
}
