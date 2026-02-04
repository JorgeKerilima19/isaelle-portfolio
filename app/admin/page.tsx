// app/admin/page.tsx
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { redirect } from "next/navigation"

const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

export default async function AdminDashboard() {
  // Get session token from cookies
  const sessionToken = (await cookies()).get("next-auth.session-token")?.value

  let user = null
  if (sessionToken) {
    try {
      const { payload } = await jwtVerify(sessionToken, secret)
      user = {
        id: payload.sub as string,
        email: payload.email as string,
        name: payload.name as string || "Admin",
        role: payload.role as string
      }
    } catch (error) {
      // Invalid token
    }
  }

  // Redirect if not authenticated (optional - proxy.ts should handle this)
  if (!user || user.role !== "admin") {
    redirect("/login")
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bienvenido, {user.name}!</h2>
      <p>Este es tu panel de administración.</p>
    </div>
  )
}