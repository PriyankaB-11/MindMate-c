"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MessageCircle, BookOpen } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { resolveEffectiveRole } from "@/lib/role-utils"

interface Booking {
  id: string
  date: string
  time: string
  status: "pending" | "approved" | "rejected"
  notes: string | null
  created_at: string
}

export default function StudentDashboardPage() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: authData } = await supabase.auth.getUser()
      const authUser = authData.user

      if (!authUser) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", authUser.id)
        .maybeSingle()

      const role = resolveEffectiveRole(profile?.role, authUser.email ?? null)
      if (role !== "student") {
        router.push("/dashboard/admin")
        return
      }

      setDisplayName(
        typeof profile?.name === "string" && profile.name.trim().length > 0
          ? profile.name
          : authUser.email?.split("@")[0] || "Student",
      )

      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("id, date, time, status, notes, created_at")
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false })

      setBookings((bookingsData as Booking[]) || [])
      setIsLoading(false)
    }

    load()
  }, [router])

  const statusVariant = (statusValue: Booking["status"]) => {
    if (statusValue === "approved") return "default"
    if (statusValue === "rejected") return "destructive"
    return "secondary"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome{displayName ? `, ${displayName}` : ""}. Track your appointments and wellness activity.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-semibold">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">AI Companion</p>
                  <Button asChild variant="link" className="px-0">
                    <Link href="/AI-Companion">Open chat</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Resources</p>
                  <Button asChild variant="link" className="px-0">
                    <Link href="/resources">Browse resources</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>Live status of your counseling appointments.</CardDescription>
              </div>
              <Button asChild>
                <Link href="/booking">Book new session</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bookings yet. Create your first session request.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </p>
                      <Badge variant={statusVariant(booking.status)} className="capitalize">
                        {booking.status}
                      </Badge>
                    </div>
                    {booking.notes ? <p className="mt-2 text-sm text-muted-foreground">{booking.notes}</p> : null}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
