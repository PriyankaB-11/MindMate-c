"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabaseClient"
import { resolveEffectiveRole } from "@/lib/role-utils"

interface AdminBooking {
  id: string
  date: string
  time: string
  status: "pending" | "approved" | "rejected"
  notes: string | null
  created_at: string
  user_id: string
  profiles?: {
    name: string | null
    email: string | null
  } | {
    name: string | null
    email: string | null
  }[] | null
}

function normalizeProfile(profile: AdminBooking["profiles"]) {
  if (!profile) return null
  return Array.isArray(profile) ? profile[0] ?? null : profile
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [adminName, setAdminName] = useState("")

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("id, date, time, status, notes, created_at, user_id, profiles:profiles!bookings_user_id_fkey(name, email)")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error loading bookings:", error);
      setLoading(false)
      return
    }

    setBookings((data as AdminBooking[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    const init = async () => {
      const { data: authData } = await supabase.auth.getUser()
      const authUser = authData.user

      if (!authUser) {
        router.push("/admin/login")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", authUser.id)
        .maybeSingle()

      const role = resolveEffectiveRole(profile?.role, authUser.email ?? null)
      if (role !== "admin") {
        router.push("/dashboard/student")
        return
      }

      setAdminName(
        typeof profile?.name === "string" && profile.name.trim().length > 0
          ? profile.name
          : authUser.email?.split("@")[0] || "Admin",
      )

      await loadBookings()
    }

    init()
  }, [router])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return bookings

    return bookings.filter((booking) => {
      const studentProfile = normalizeProfile(booking.profiles)
      const studentName = studentProfile?.name || ""
      const studentEmail = studentProfile?.email || ""
      return (
        studentName.toLowerCase().includes(q) ||
        studentEmail.toLowerCase().includes(q) ||
        (booking.notes || "").toLowerCase().includes(q)
      )
    })
  }, [bookings, search])

  const updateStatus = async (id: string, statusValue: "approved" | "rejected") => {
    const { error } = await supabase.from("bookings").update({ status: statusValue }).eq("id", id)

    if (error) {
      alert(`Error updating booking: ${error.message}`);
      return
    }

    setBookings((prev) => prev.map((item) => (item.id === id ? { ...item, status: statusValue } : item)))
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter((booking) => booking.status === "pending").length,
    approved: bookings.filter((booking) => booking.status === "approved").length,
    rejected: bookings.filter((booking) => booking.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome{adminName ? `, ${adminName}` : ""}. Review and manage student booking requests.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-semibold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-semibold">{stats.approved}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-semibold">{stats.rejected}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Requests</CardTitle>
            <CardDescription>Use approve/reject to update booking status.</CardDescription>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, email, or notes"
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading bookings...</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bookings found.</p>
            ) : (
              <div className="space-y-3">
                {filtered.map((booking) => {
                  const studentProfile = normalizeProfile(booking.profiles)

                  return (
                    <div key={booking.id} className="rounded-md border p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-medium">{studentProfile?.name || "Student"}</p>
                          <p className="text-sm text-muted-foreground">{studentProfile?.email || "No email"}</p>
                        </div>
                        <Badge className="capitalize" variant={booking.status === "approved" ? "default" : booking.status === "rejected" ? "destructive" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </p>
                      {booking.notes ? <p className="mt-2 text-sm text-muted-foreground">{booking.notes}</p> : null}

                      {booking.status === "pending" ? (
                        <div className="mt-4 flex gap-2">
                          <Button onClick={() => updateStatus(booking.id, "approved")}>Approve</Button>
                          <Button variant="destructive" onClick={() => updateStatus(booking.id, "rejected")}>
                            Reject
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
