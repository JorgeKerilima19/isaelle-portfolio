// app/login/page.tsx
"use client";

import { authenticate } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect } from "react";

function SubmitButton() {
  return (
    <button
      type="submit"
      className="w-full py-2 px-4 rounded-md bg-amber-500 hover:bg-amber-600 text-white transition-colors"
    >
      Entrar
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">
          Iniciar Sesión
        </h1>

        {state === "invalid_credentials" && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            Email o contraseña incorrectos
          </div>
        )}
        {state === "missing_fields" && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            Por favor, complete todos los campos
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

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

          <SubmitButton />
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-amber-500 hover:underline">
            ← Volver al sitio
          </a>
        </div>
      </div>
    </div>
  );
}
