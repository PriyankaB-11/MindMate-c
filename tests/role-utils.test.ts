import { describe, expect, it } from "vitest"
import { getDashboardPath, isUserRole } from "@/lib/role-utils"

describe("role utils", () => {
  it("validates supported roles", () => {
    expect(isUserRole("student")).toBe(true)
    expect(isUserRole("admin")).toBe(true)
    expect(isUserRole("mentor")).toBe(false)
    expect(isUserRole(undefined)).toBe(false)
  })

  it("returns dashboard path for each role", () => {
    expect(getDashboardPath("student")).toBe("/dashboard/student")
    expect(getDashboardPath("admin")).toBe("/dashboard/admin")
  })
})
