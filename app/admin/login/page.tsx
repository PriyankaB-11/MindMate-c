import { redirect } from "next/navigation"

export default function LegacyAdminLoginRedirectPage() {
  redirect("/login")
}
