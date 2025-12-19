"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode
}

export function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      const dashboardPath = user.role === "admin" ? "/dashboard/admin" : "/dashboard/student"
      router.push(dashboardPath)
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <>{children}</>
  }

  if (user) {
    return null
  }

  return <>{children}</>
}
