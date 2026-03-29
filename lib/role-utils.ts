export type UserRole = "student" | "admin"

// Update these values in code to define who should be treated as the default admin account.
export const DEFAULT_ADMIN_EMAIL = "priii160028@gmail.com"
export const DEFAULT_ADMIN_NAME = "Admin"

export function isUserRole(value: unknown): value is UserRole {
  return value === "student" || value === "admin"
}

export function getDashboardPath(role: UserRole): string {
  return role === "admin" ? "/dashboard/admin" : "/dashboard/student"
}

export function isDefaultAdminIdentity(name: string, email: string): boolean {
  return (
    email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.trim().toLowerCase() &&
    name.trim().toLowerCase() === DEFAULT_ADMIN_NAME.trim().toLowerCase()
  )
}

export function isDefaultAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.trim().toLowerCase()
}

export function resolveRoleForSignup(name: string, email: string): UserRole {
  return isDefaultAdminEmail(email) || isDefaultAdminIdentity(name, email) ? "admin" : "student"
}

export function resolveEffectiveRole(role: unknown, email: string | null | undefined): UserRole {
  if (isDefaultAdminEmail(email)) {
    return "admin"
  }

  return isUserRole(role) ? role : "student"
}
