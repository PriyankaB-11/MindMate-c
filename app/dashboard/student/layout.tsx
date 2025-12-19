import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute requiredRole="student">{children}</ProtectedRoute>
}
