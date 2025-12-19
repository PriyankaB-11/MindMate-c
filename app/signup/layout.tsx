import type React from "react"
import { RedirectIfAuthenticated } from "@/components/redirect-if-authenticated"

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RedirectIfAuthenticated>{children}</RedirectIfAuthenticated>
}
