// app/register/page.tsx
"use client";

import { registerUser } from "@/actions/register";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-2 px-4 rounded-md transition-colors ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-amber-500 hover:bg-amber-600"
      } text-white`}
    >
      {pending ? "Creando..." : "Crear Cuenta"}
    </button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUser, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#055b2c]">
          Crear Cuenta de Administrador
        </h1>

        {state === "user_exists" && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            Este email ya está registrado
          </div>
        )}
        {state === "password_mismatch" && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            Las contraseñas no coinciden
          </div>
        )}
        {state === "password_too_short" && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            La contraseña debe tener al menos 8 caracteres
          </div>
        )}
        {state === "missing_fields" && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            Por favor, complete todos los campos
          </div>
        )}
        {state === "success" && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            ¡Cuenta creada! Ahora puede{" "}
            <Link href="/login" className="text-amber-500 underline">
              iniciar sesión
            </Link>
            .
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <SubmitButton />
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-amber-500 hover:underline">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
}
