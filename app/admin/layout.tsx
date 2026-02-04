// app/admin/layout.tsx
"use client";

import { logout } from "@/actions/logout";
import { useFormState } from "react-dom";

function LogoutButton() {
  const [_, formAction] = useFormState(logout, undefined);

  return (
    <form action={formAction} className="ml-auto">
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
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
        <h1 className="text-xl font-bold">Panel de Administración</h1>
        <LogoutButton />
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
